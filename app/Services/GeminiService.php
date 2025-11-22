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
}