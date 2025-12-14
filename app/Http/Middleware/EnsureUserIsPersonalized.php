<?php

namespace App\Http\Middleware;

use App\Models\KebutuhanHarian;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsPersonalized
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('login');
        }

        $sudah = KebutuhanHarian::where('user_id', $user->id)->exists();

        // JIKA BELUM personalisasi, arahkan ke halaman personalisasi.
        if (!$sudah) {
            return redirect()->route('personalisasi');
        }

        // JIKA SUDAH personalisasi, izinkan akses ke rute yang dilindungi (profil, scan, dll).
        return $next($request);
    }
}
