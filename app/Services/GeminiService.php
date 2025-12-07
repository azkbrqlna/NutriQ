<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class GeminiService
{
    private $keys;
    private $model = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

    public function __construct()
    {
        $this->keys = [
            env('GEMINI_API_KEY_1'),
            env('GEMINI_API_KEY_2'),
            env('GEMINI_API_KEY_3')
        ];
    }

    private function requestWithFallback($body)
    {
        foreach ($this->keys as $key) {
            if (!$key) {
                continue;
            }

            $url = $this->model . "?key={$key}";

            try {
                $response = Http::withHeaders([
                    "Content-Type" => "application/json",
                ])->post($url, $body);

                if ($response->successful()) {
                    return $response;
                }

                // Jika rate limit / quota abis / error 429, otomatis lanjut ke key berikutnya
                if ($response->status() == 429 || $response->status() == 403) {
                    continue;
                }

            } catch (\Exception $e) {
                continue;
            }
        }

        return null;
    }

    public function hitungKebutuhan($user)
    {
        $prompt = "
            Bertindaklah sebagai Ahli Gizi Klinis Profesional.
            Tugasmu: Menghitung TDEE (Total Daily Energy Expenditure) dan kebutuhan makronutrisi pasien secara presisi.

            INSTRUKSI LOGIKA:
            1. Hitung BMR menggunakan rumus Mifflin-St Jeor:
               - Pria: (10 * berat_kg) + (6.25 * tinggi_cm) - (5 * umur) + 5
               - Wanita: (10 * berat_kg) + (6.25 * tinggi_cm) - (5 * umur) - 161
            2. Tentukan Faktor Aktivitas (Multiplier) berdasarkan input '{$user->aktivitas}':
               - Sedentary (sedikit/tidak olahraga): x1.2
               - Lightly active (olahraga ringan 1-3 hari/minggu): x1.375
               - Moderately active (olahraga sedang 3-5 hari/minggu): x1.55
               - Very active (olahraga berat 6-7 hari/minggu): x1.725
               - Extra active (fisik sangat berat/atlet): x1.9
            3. Hitung TDEE = BMR * Faktor Aktivitas.
            4. Distribusi Makro (Target): Protein 15%, Lemak 25%, Karbo 60%.
               - 1g Protein = 4 kkal
               - 1g Karbo = 4 kkal
               - 1g Lemak = 9 kkal
            5. Serat: Minimal 14g per 1000 kkal.
            6. Gula Tambahan: Maksimal 10% dari total kalori.

            DATA PASIEN:
            Umur: {$user->umur} tahun
            Jenis Kelamin: {$user->jenis_kelamin}
            Tinggi: {$user->tinggi} cm
            Berat: {$user->berat} kg
            Aktivitas: {$user->aktivitas}

            FORMAT OUTPUT:
            Jika data tidak valid atau tidak masuk akal (misal berat badan 1000kg), return:
            {\"error\": \"gagal_menghitung\"}

            Jika berhasil, return JSON VALID (Hanya JSON, tanpa markdown):
            {
              \"kalori\": (number, bulat),
              \"protein\": (number, bulat, dalam gram),
              \"lemak\": (number, bulat, dalam gram),
              \"karbohidrat\": (number, bulat, dalam gram),
              \"serat\": (number, bulat, dalam gram),
              \"natrium\": (number, bulat, mg, estimasi 2300),
              \"gula_tambahan\": (number, bulat, dalam gram)
            }
        ";

        $body = [
            "contents" => [
                ["parts" => [["text" => $prompt]]]
            ],
            "generationConfig" => [
                "temperature" => 0,
                "topK" => 1,
                "topP" => 1,
                "maxOutputTokens" => 2000,
            ]
        ];

        $response = $this->requestWithFallback($body);

        if (!$response) {
            return ['error' => 'api_gagal_semua_key'];
        }

        $data = $response->json();
        $text = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;

        if (!$text) {
            return ['error' => 'respon_kosong'];
        }

        preg_match('/\{(?:[^{}]|(?R))*\}/', $text, $match);

        if (!isset($match[0])) {
            return ['error' => 'json_tidak_valid'];
        }

        $json = json_decode($match[0], true);

        if (!$json) {
            return ['error' => 'json_gagal_parse'];
        }

        if (isset($json['error'])) {
            return ['error' => $json['error']];
        }

        return $json;
    }

    public function generateMakanan($imageFile)
    {
        $imageData = base64_encode(file_get_contents($imageFile->getRealPath()));
        $mimeType = $imageFile->getMimeType();

        $prompt = "
            Bertindaklah sebagai Ahli Gizi Senior dan Pengamat Kuliner (spesialis masakan Indonesia dan Internasional).
            Analisis gambar yang diberikan dengan langkah berpikir berikut:

            LANGKAH 1: STRICT FILTERING (PADAT VS CAIR/NON-MAKANAN)
            Tugas utamamu adalah mendeteksi MAKANAN (Solid Food/Meal).
            Analisis objek utama dalam gambar.
            
            KASUS RETURN ERROR:
            Segera return JSON {\"error\": \"bukan_makanan\"} jika gambar didominasi oleh:
            1. MINUMAN/CAIRAN: Segala jenis Jus, Kopi, Teh, Susu, Soda, Air Mineral, Alkohol, Sirup, atau minuman dalam gelas/botol/cangkir.
            2. BENDA MATI: Laptop, meja kosong, pemandangan, alat makan kosong, elektronik, dll.
            3. OBAT/SUPLEMEN: Pil, kapsul, bubuk.

            PENGECUALIAN (Diterima sebagai Makanan):
            - Sup (Soto, Rawon, Sayur Asem).
            - Bubur (Bubur Ayam, Oatmeal).
            - Smoothie Bowl (yang kental dan dimakan dengan sendok, bukan diminum).
            
            Jika lolos filter (ini adalah makanan padat/meal), lanjut ke Langkah 2.

            LANGKAH 2: DETEKSI DETAIL MAKANAN
            - Identifikasi nama makanan (prioritaskan nama lokal Indonesia jika relevan, misal: 'Nasi Goreng' jangan hanya 'Fried Rice').
            - Identifikasi komponen dalam piring (nasi, lauk, sayur, saus).
            - ESTIMASI PORSI: Lihat ukuran piring atau wadah untuk memperkirakan gramasi (misal: 1 porsi nasi ≈ 150g).

            LANGKAH 3: KALKULASI NUTRISI
            - Hitung estimasi kalori dan makro berdasarkan komponen dan porsi yang dideteksi.
            - Gunakan database nutrisi standar (seperti TKPI atau USDA).
            - Jangan berikan range, berikan satu angka estimasi terbaik (rata-rata).

            LANGKAH 4: FORMAT OUTPUT
            Wajib return HANYA JSON valid sesuai struktur berikut (tanpa markdown ```json):

            FORMAT JSON YANG WAJIB DIIKUTI:
            {
                \"nama\": \"Nama Makanan Utama\",
                \"tanggal\": \"" . date('Y-m-d') . "\",
                \"jam\": \"" . date('H:i') . "\",
                \"foto\": null,
                \"detail\": [
                    {
                        \"nama\": \"Nama Komponen (misal: Nasi Putih)\",
                        \"kalori\": (number, kcal),
                        \"protein\": (number, gram),
                        \"karbohidrat\": (number, gram),
                        \"lemak\": (number, gram),
                        \"serat\": (number, gram),
                        \"natrium\": (number, mg),
                        \"gula_tambahan\": (number, gram)
                    },
                    {
                        \"nama\": \"Nama Komponen (misal: Ayam Goreng)\",
                        \"kalori\": (number),
                        \"protein\": (number),
                        \"karbohidrat\": (number),
                        \"lemak\": (number),
                        \"serat\": (number),
                        \"natrium\": (number),
                        \"gula_tambahan\": (number)
                    }
                ],
                \"total\": {
                    \"total_kalori\": (number, penjumlahan dari detail),
                    \"total_protein\": (number, penjumlahan dari detail),
                    \"total_karbohidrat\": (number, penjumlahan dari detail),
                    \"total_lemak\": (number, penjumlahan dari detail),
                    \"total_serat\": (number, penjumlahan dari detail),
                    \"total_natrium\": (number, penjumlahan dari detail),
                    \"total_gula_tambahan\": (number, penjumlahan dari detail)
                }
            }
        ";

        $body = [
            "contents" => [[
                "parts" => [
                    ["text" => $prompt],
                    [
                        "inline_data" => [
                            "mime_type" => $mimeType,
                            "data" => $imageData
                        ]
                    ]
                ]
            ]],
            "generationConfig" => [
                "temperature" => 0.1, 
                "topK" => 32,
                "topP" => 1,
                "maxOutputTokens" => 8192,
            ]
        ];

        $response = $this->requestWithFallback($body);

        if (!$response) {
            return ['error' => 'api_gagal_semua_key'];
        }

        $data = $response->json();
        $text = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;

        if (!$text) {
            return ['error' => 'respon_kosong'];
        }

        // Bersihkan Markdown jikalau AI tetap bandel
        $text = preg_replace('/^```json\s*|\s*```$/', '', $text);
        
        // Parse JSON
        // Gunakan regex flag 's' (dot matches newline) untuk keamanan ekstra
        preg_match('/\{(?:[^{}]|(?R))*\}/s', $text, $match);

        if (!isset($match[0])) {
            // Fallback: coba parse langsung text-nya siapa tau sudah bersih
            $json = json_decode($text, true);
        } else {
            $json = json_decode($match[0], true);
        }

        if (!$json) {
            return ['error' => 'json_tidak_bisa_parse'];
        }

        if (isset($json['error']) && $json['error'] === 'bukan_makanan') {
            return ['error' => 'bukan_makanan'];
        }

        // Validasi struktur kunci penting saja
        if (!isset($json['nama']) || !isset($json['detail']) || !isset($json['total'])) {
            return ['error' => 'struktur_tidak_lengkap'];
        }

        return $json;
    }
}
