<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function registerForm()
    {
        return Inertia::render('Auth/Register');
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'umur' => 'nullable|integer',
            'jenis_kelamin' => 'nullable|string',
            'tinggi' => 'nullable|integer',
            'berat' => 'nullable|integer',
            'aktivitas' => 'nullable|string',
        ]);

        $user = User::create($validated);
         Auth::login($user);

        return redirect()->route('dashboard')->with('success', 'Registration successful');

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

            return redirect()->route('dashboard')
                ->with('success', 'Login successful');
        }

        return back()->withErrors([
            'email' => 'Invalid credentials'
        ])->withInput();

    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login')->with('success', 'Logged out successfully');
    }
}
