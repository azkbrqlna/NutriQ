<?php

namespace App\Http\Controllers;

use App\Models\DetailMakanan;
use App\Models\Makanan;
use App\Services\GeminiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MakananController extends Controller
{
    public function index()
    {
        return Inertia::render('Makanan/Index');
    }

    public function generate_makanan(Request $request, GeminiService $gemini)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120', // Max 5MB
            'tanggal' => 'required|date',
            'jam' => 'required'
        ]);

        $file = $request->file('image');
        $hasil = $gemini->generateMakanan($file);

        if (!$hasil) {
            return back()->withErrors(['error' => 'Gagal menganalisis gambar makanan.']);
        }

        $path = $file->store('makanan', 'public');

        $user = Auth::user();

        $makanan = Makanan::create([
            'user_id' => $user->id,
            'nama' => $hasil['nama'],
            'tanggal' => $request->tanggal,
            'jam' => $request->jam,
            'foto' => '/storage/' . $path, // Simpan path gambar
            'total_kalori' => $hasil['total']['total_kalori'],
            'total_protein' => $hasil['total']['total_protein'],
            'total_karbohidrat' => $hasil['total']['total_karbohidrat'],
            'total_lemak' => $hasil['total']['total_lemak'],
            'total_serat' => $hasil['total']['total_serat'],
            'total_natrium' => $hasil['total']['total_natrium'],
            'total_gula_tambahan' => $hasil['total']['total_gula_tambahan'],
        ]);

        foreach ($hasil['detail'] as $item) {
            DetailMakanan::create([
                'makanan_id' => $makanan->id,
                'nama' => $item['nama'],
                'kalori' => $item['kalori'],
                'protein' => $item['protein'],
                'karbohidrat' => $item['karbohidrat'],
                'lemak' => $item['lemak'],
                'serat' => $item['serat'],
                'natrium' => $item['natrium'],
                'gula_tambahan' => $item['gula_tambahan'],
            ]);
        }

       return redirect()->route('riwayat.show', $makanan->slug);

    }
    public function show($slug)
    {
        $userId = Auth::id();
        $makanan = Makanan::with('detailMakanans')
            ->where('user_id', $userId)
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('Makanan/HasilScanMakanan', [
            'makanan' => $makanan,
        ]);
    }

    public function riwayat()
    {
        $userId = Auth::id();
        $makanans = Makanan::where('user_id', $userId)
            ->orderBy('tanggal', 'desc')
            ->orderBy('jam', 'desc')
            ->get();

        dd($makanans);

        return Inertia::render('Makanan/Riwayat', [
            'makanans' => $makanans,
        ]);
    }
}