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
        return Inertia::render('Makanan/Rekomendasi');
    }

    public function generate(Request $request)
    {
        // 1. Validasi Input Budget
        $request->validate([
            'budget' => 'required|numeric|min:5000',
        ]);

        $user = Auth::user();
        $tanggal = now()->toDateString();

        // 2. Ambil Target Kebutuhan Harian User
        $kebutuhan = KebutuhanHarian::where('user_id', $user->id)->first();

        if (!$kebutuhan) {
            return back()->withErrors(['message' => 'Mohon isi data diri dan hitung kebutuhan harian terlebih dahulu di halaman Profil/Dashboard.']);
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

      
        $sisaKebutuhan = [
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

        // 6. Handle Error dari API
        if (isset($hasilRekomendasi['error'])) {
            return back()->withErrors(['gemini' => 'Gagal mendapatkan rekomendasi: ' . $hasilRekomendasi['error']]);
        }

        return Inertia::render('Makanan/Rekomendasi', [
            'rekomendasi' => $hasilRekomendasi, 
            'sisaKebutuhan' => $sisaKebutuhan,  
            'budget' => $request->budget,       
        ]);
    }
}