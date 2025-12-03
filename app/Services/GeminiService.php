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

    /* =======================================================================
       HITUNG KEBUTUHAN MAKAN - MENGGUNAKAN FALLBACK API KEY
       ======================================================================= */
    public function hitungKebutuhan($user)
    {
        $prompt = "
            Bertindak sebagai Ahli Gizi Klinis.
            Hitung kebutuhan nutrisi harian berdasarkan Mifflin-St Jeor.

            Jika gagal menghitung karena input tidak jelas, balas:
            {\"error\": \"gagal_menghitung\"}

            Data Pasien:
            Umur: {$user->umur}
            Jenis Kelamin: {$user->jenis_kelamin}
            Tinggi: {$user->tinggi}
            Berat: {$user->berat}
            Aktivitas: {$user->aktivitas}

            ATURAN MAKRO:
            Protein 15%
            Lemak 25%
            Karbo 60%

            Keluarkan JSON VALID SAJA:
            {
              \"kalori\": number,
              \"protein\": number,
              \"lemak\": number,
              \"karbohidrat\": number,
              \"serat\": number,
              \"natrium\": number,
              \"gula_tambahan\": number
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
            Bertindaklah sebagai Ahli Gizi Klinis spesialis masakan Indonesia.
            Tugasmu adalah menganalisis gambar makanan yang diunggah.

            LANGKAH ANALISIS:
            1. Identifikasi apakah gambar tersebut adalah makanan.
            2. Jika BUKAN makanan (misal: pemandangan, benda mati, selfie, minuman), balas JSON: {\"error\": \"bukan_makanan\"}
            3. Jika MAKANAN:
            - Identifikasi setiap komponen yang terlihat (nasi, lauk, sayur, saus/sambal).
            - Perkirakan gramasi/berat per komponen (misal: 1 piring nasi = 150g).
            - Hitung estimasi nutrisi berdasarkan Data Komposisi Pangan Indonesia (TKPI) atau USDA.
            - Berikan nama makanan yang spesifik (contoh: 'Nasi Ayam Geprek', bukan cuma 'Nasi Ayam').

            ATURAN OUTPUT:
            - Gunakan Bahasa Indonesia.
            - Semua angka nutrisi harus INTEGER (bilangan bulat), bulatkan jika perlu.
            - Jangan sertakan markdown (```json). Langsung raw JSON.

            FORMAT JSON YANG WAJIB DIIKUTI:
            {
                \"nama\": \"Nama Makanan Utama\",
                \"detail\": [
                    {
                        \"nama\": \"Nama Komponen (misal: Dada Ayam Goreng)\",
                        \"kalori\": int,
                        \"protein\": int,
                        \"karbohidrat\": int,
                        \"lemak\": int,
                        \"serat\": int,
                        \"natrium\": int (mg),
                        \"gula_tambahan\": int
                    }
                ],
                \"total\": {
                    \"total_kalori\": int,
                    \"total_protein\": int,
                    \"total_karbohidrat\": int,
                    \"total_lemak\": int,
                    \"total_serat\": int,
                    \"total_natrium\": int,
                    \"total_gula_tambahan\": int
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
                "temperature" => 0.2, // Turunkan temperature agar lebih konsisten/faktual
                "maxOutputTokens" => 4096,
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
