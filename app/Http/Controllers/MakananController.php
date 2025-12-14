<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Makanan;
use Illuminate\Http\Request;
use App\Models\DetailMakanan;
use App\Services\GeminiService;
use Illuminate\Support\Facades\Auth;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class MakananController extends Controller
{
    public function index()
    {
        return Inertia::render('Makanan/ScanMakanan');
    }

    public function generate_makanan(Request $request)
    {
        // 1. Validasi
        $request->validate([
            'image' => 'required|image|max:5120',
        ]);

        try {
            $file = $request->file('image');

            // 2. Upload Menggunakan FILESYSTEM DISK (Cara Baru)
            // Syntax: $file->store('nama_folder', 'nama_disk');
            // Ini akan otomatis membaca config 'cloudinary' di filesystems.php
            $path = $file->store('test_filesystem', 'cloudinary');

            // 3. Ambil URL Publik
            // Kita minta Laravel mengambilkan URL lengkapnya dari disk cloudinary
            $url = \Illuminate\Support\Facades\Storage::disk('cloudinary')->url($path);

            // 4. Debugging: Tampilkan URL
            dd([
                'STATUS' => 'BERHASIL UPLOAD LEWAT FILESYSTEM',
                'PATH' => $path,
                'URL_LENGKAP' => $url
            ]);
        } catch (\Exception $e) {
            dd("GAGAL UPLOAD: " . $e->getMessage());
        }
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

    public function riwayat(Request $request)
    {
        $userId = Auth::id();

        $makanans = Makanan::where('user_id', $userId)
            ->when($request->search, function ($query) use ($request) {
                $query->where('nama', 'like', '%' . $request->search . '%');
            })
            ->when($request->tanggal, function ($query) use ($request) {
                $query->where('tanggal', $request->tanggal);
            })
            ->orderBy('tanggal', 'desc')
            ->orderBy('jam', 'desc')
            ->paginate(6)
            ->withQueryString();

        return Inertia::render('Riwayat/Riwayat', [
            'makanans' => $makanans,
            'filters' => $request->only('search', 'tanggal'),
        ]);
    }

    public function show_rekomendasi()
    {
        return Inertia::render("Makanan/Rekomendasi");
    }
}
