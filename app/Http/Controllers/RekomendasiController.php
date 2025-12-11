<?php

namespace App\Http\Controllers;

use App\Models\KebutuhanHarian;
use App\Models\Makanan;
use App\Services\GeminiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RekomendasiController extends Controller
{
    protected $geminiService;

    public function __construct(GeminiService $geminiService)
    {
        $this->geminiService = $geminiService;
    }

    public function index()
    {
        return Inertia::render('Makanan/Rekomendasi', [
            'rekomendasi' => null,
            'sisaKebutuhan' => null,
            'budget' => null
        ]);
    }

    public function generate(Request $request)
    {
        $request->validate([
            'budget' => 'required|numeric|min:5000',
        ], [
            'budget.required' => 'Budget harus diisi.',
            'budget.min' => 'Budget minimal Rp 5.000 agar AI bisa mencari makanan.',
        ]);

        $user = Auth::user();
        $tanggal = now()->toDateString();

        $kebutuhan = KebutuhanHarian::where('user_id', $user->id)->first();

        if (!$kebutuhan) {
            return back()->withErrors(['message' => 'Mohon hitung kebutuhan harian terlebih dahulu di menu Profil.']);
        }
        $sudahDimakan = Makanan::where('user_id', $user->id)
            ->whereDate('tanggal', $tanggal)
            ->selectRaw('
                COALESCE(SUM(total_kalori), 0) as kalori,
                COALESCE(SUM(total_protein), 0) as protein,
                COALESCE(SUM(total_karbohidrat), 0) as karbohidrat,
                COALESCE(SUM(total_lemak), 0) as lemak,
                COALESCE(SUM(total_serat), 0) as serat,
                COALESCE(SUM(total_natrium), 0) as natrium,
                COALESCE(SUM(total_gula_tambahan), 0) as gula_tambahan
            ')
            ->first();
        $sisaKebutuhan = (object) [
            'kalori' => max(0, $kebutuhan->kalori - $sudahDimakan->kalori),
            'protein' => max(0, $kebutuhan->protein - $sudahDimakan->protein),
            'karbohidrat' => max(0, $kebutuhan->karbohidrat - $sudahDimakan->karbohidrat),
            'lemak' => max(0, $kebutuhan->lemak - $sudahDimakan->lemak),
            'serat' => max(0, $kebutuhan->serat - $sudahDimakan->serat),
            'natrium' => max(0, $kebutuhan->natrium - $sudahDimakan->natrium),
            'gula_tambahan' => max(0, $kebutuhan->gula_tambahan - $sudahDimakan->gula_tambahan),
        ];
        
        $hasilRekomendasi = $this->geminiService->rekomendasiMakanan(
            $request->budget, 
            $kebutuhan, 
            $sudahDimakan
        );

      if (isset($hasilRekomendasi['error'])) {
            $rawError = $hasilRekomendasi['error'];
            $pesanUser = 'Maaf, terjadi kesalahan saat mencari rekomendasi.';

            if ($rawError === 'api_gagal_koneksi') {
                $pesanUser = 'Gagal terhubung ke AI. Periksa koneksi internet Anda.';
            } elseif ($rawError === 'quota_exceeded') {
                $pesanUser = 'Server AI sedang sibuk (Limit Habis). Mohon tunggu beberapa saat lagi.';
            } elseif (str_contains(strtolower($rawError), 'json')) {
                $pesanUser = 'AI memberikan data yang tidak valid. Silakan coba cari lagi.';
            } else {
                $pesanUser = 'Gagal memproses AI: ' . $rawError;
            }

            return back()->withErrors(['gemini' => $pesanUser]);
        }


        return Inertia::render('Makanan/Rekomendasi', [
            'rekomendasi' => $hasilRekomendasi, 
            'sisaKebutuhan' => $sisaKebutuhan,  
            'budget' => $request->budget,       
        ]);
    }
}