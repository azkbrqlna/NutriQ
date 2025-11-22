<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\KebutuhanHarian;
use App\Services\GeminiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function registerForm()
    {
        return Inertia::render('Auth/Register');
    }

    public function register(Request $request, GeminiService $gemini)
    {
        $validated = $request->validate([
            'name'            => 'required',
            'email'           => 'required|email|unique:users',
            'password'        => 'required|min:6',
            'umur'            => 'nullable|integer',
            'jenis_kelamin'   => 'nullable|string',
            'tinggi'          => 'nullable|integer',
            'berat'           => 'nullable|integer',
            'aktivitas'       => 'nullable|string',
        ]);

        $user = User::create($validated);

        $hasil = $gemini->hitungKebutuhan($user);

        if ($hasil) {
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
        }

        Auth::login($user);

        return redirect()->route('dashboard')->with('success', 'Registrasi berhasil! Selamat datang.');
    }

    public function loginForm()
    {
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->route('dashboard')->with('success', 'Login successful');
        }

        return back()->withErrors(['email' => 'Invalid credentials'])->withInput();
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login')->with('success', 'Logged out successfully');
    }
}