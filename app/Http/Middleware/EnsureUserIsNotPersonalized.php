<?php

namespace App\Http\Middleware;

use App\Models\KebutuhanHarian;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsNotPersonalized
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
   public function handle($request, Closure $next)
    {
        $user = $request->user();

        // kalau belum login, langsung tolak
        if (!$user) {
            return redirect()->route('login');
        }

        $sudah = KebutuhanHarian::where('user_id', $user->id)->exists();

        if ($sudah) {
            return redirect()->route('dashboard')
                ->with('warning', 'Anda sudah mengisi personalisasi.');
        }

        return $next($request);
    }

}
