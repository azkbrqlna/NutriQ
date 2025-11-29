<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class GeminiService
{
    public function hitungKebutuhan($user)
    {
        $apiKey = env('GEMINI_API_KEY');
        $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}";

        $prompt = "
            Bertindaklah sebagai Ahli Gizi Klinis.
            Hitung kebutuhan nutrisi harian dengan rumus Mifflin-St Jeor:
            
            Data Pasien:
            Umur: {$user->umur} tahun
            Jenis Kelamin: {$user->jenis_kelamin}
            Tinggi: {$user->tinggi} cm
            Berat: {$user->berat} kg
            Aktivitas: {$user->aktivitas}

            ATURAN PEMBAGIAN MAKRO (WAJIB IKUTI AGAR KONSISTEN):
            - Protein: 15% dari total kalori
            - Lemak: 25% dari total kalori
            - Karbohidrat: 60% dari total kalori (Sisa)
            
            Keluarkan HANYA JSON valid. Jangan ada teks lain.
            Format JSON:
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

        try {
            $response = Http::withHeaders([
                "Content-Type" => "application/json",
            ])->post($url, [
                "contents" => [
                    ["parts" => [["text" => $prompt]]]
                ],
                "generationConfig" => [
                    "temperature" => 0,       
                    "topK" => 1,
                    "topP" => 1,
                    "maxOutputTokens" => 2000,
                ]
            ]);

            if ($response->failed()) {
                return null;
            }

            $data = $response->json();
            $text = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;

            if (!$text) {
                return null;
            }

            preg_match('/\{(?:[^{}]|(?R))*\}/', $text, $match);

            if (!isset($match[0])) {
                return null;
            }

            return json_decode($match[0], true);

        } catch (\Exception $e) {
            return null;
        }
    }

    public function generateMakanan($imageFile)
    {
        $apiKey = env('GEMINI_API_KEY');
        
        // PENTING: Gunakan 1.5-flash agar lebih stabil dan tidak 'overthinking' sampai timeout
        $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}";

        // Konversi gambar ke Base64
        $imageData = base64_encode(file_get_contents($imageFile->getRealPath()));
        $mimeType = $imageFile->getMimeType();

        $prompt = "
            Kamu adalah Ahli Gizi. Analisis gambar makanan ini.
            Identifikasi nama makanannya dan perkirakan nutrisinya.
            
            Hasilkan JSON VALID saja. Tidak boleh ada teks lain (seperti ```json).
            
            Format JSON harus persis seperti ini:
            {
                \"nama\": string (nama makanan dalam bahasa indonesia),
                \"tanggal\": string (yyyy-mm-dd hari ini),
                \"jam\": string (HH:MM sekarang),
                \"foto\": null,
                \"detail\": [
                    {
                        \"nama\": string (komponen makanan),
                        \"kalori\": number,
                        \"protein\": number,
                        \"karbohidrat\": number,
                        \"lemak\": number,
                        \"serat\": number,
                        \"natrium\": number,
                        \"gula_tambahan\": number
                    }
                ],
                \"total\": {
                    \"total_kalori\": number,
                    \"total_protein\": number,
                    \"total_karbohidrat\": number,
                    \"total_lemak\": number,
                    \"total_serat\": number,
                    \"total_natrium\": number,
                    \"total_gula_tambahan\": number
                }
            }
        ";

        try {
            $response = Http::withHeaders([
                "Content-Type" => "application/json",
            ])->post($url, [
                "contents" => [
                    [
                        "parts" => [
                            ["text" => $prompt],
                            [
                                "inline_data" => [
                                    "mime_type" => $mimeType,
                                    "data" => $imageData
                                ]
                            ]
                        ]
                    ]
                ],
                "generationConfig" => [
                    "temperature" => 0.1, // Rendahkan temperature agar jawaban konsisten JSON
                    "maxOutputTokens" => 8192, // NAIKKAN INI (Dulu 2000, sekarang 8000 biar gak kepotong)
                ]
            ]);

            if ($response->failed()) {
                // Log error jika perlu, atau return null agar controller menangani
                return null;
            }

            $data = $response->json();
            $text = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;

            if (!$text) return null;

            // Bersihkan format markdown ```json ... ``` jika ada
            $text = preg_replace('/^```json\s*|\s*```$/', '', $text);

            preg_match('/\{(?:[^{}]|(?R))*\}/', $text, $match);

            if (!isset($match[0])) {
                return null;
            }

            return json_decode($match[0], true);

        } catch (\Exception $e) {
            return null;
        }
    }
}