<?php

namespace App\Http\Controllers;

use App\Models\KebutuhanHarian;
use App\Services\GeminiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Pengguna/Personalisasi');
    }

    public function store(Request $request, GeminiService $gemini)
    {
        $validated = $request->validate([
            'umur'            => 'required|integer',
            'jenis_kelamin'   => 'required|string',
            'tinggi'          => 'required|integer',
            'berat'           => 'required|integer',
            'aktivitas'       => 'required|string',
        ]);

        $user = Auth::user();
        $user->update($validated);

        $hasil = $gemini->hitungKebutuhan($user);

        if (isset($hasil['error'])) {
            $pesan = match($hasil['error']) {
                'api_gagal' => 'Gagal menghubungi layanan perhitungan nutrisi.',
                'respon_kosong' => 'Layanan tidak memberikan hasil.',
                'json_tidak_valid' => 'Format perhitungan tidak valid.',
                'json_gagal_parse' => 'Data perhitungan tidak bisa diproses.',
                'gagal_menghitung' => 'Data tidak dapat dihitung. Periksa kembali input.',
                default => 'Terjadi kesalahan saat menghitung kebutuhan nutrisi.'
            };

            return back()->withErrors(['error' => $pesan]);
        }

        // Lolos semua error → simpan ke database
        KebutuhanHarian::create([
            'user_id'       => $user->id,
            'kalori'        => $hasil['kalori'] ?? 0,
            'protein'       => $hasil['protein'] ?? 0,
            'lemak'         => $hasil['lemak'] ?? 0,
            'karbohidrat'   => $hasil['karbohidrat'] ?? 0,
            'serat'         => $hasil['serat'] ?? 0,
            'natrium'       => $hasil['natrium'] ?? 0,
            'gula_tambahan' => $hasil['gula_tambahan'] ?? 0,
        ]);

        return redirect()->route('dashboard')->with('success', 'Data berhasil disimpan!');
    }


    public function show_profil()
    {
        return Inertia::render("Pengguna/Profil", [
            "user" => Auth::user()
        ]);
    }
}
