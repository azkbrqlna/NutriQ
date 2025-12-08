<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MakananController;
use App\Http\Controllers\RekomendasiController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

// Auth Routes
Route::middleware("guest")->group(function () {
    Route::get('/register', [AuthController::class, 'registerForm'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
    Route::get('/login', [AuthController::class, 'loginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});


Route::middleware(['auth'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/personalisasi', [UserController::class, 'index'])->name('personalisasi');
    Route::post('/personalisasi', [UserController::class, 'store'])->name('personalisasi.store');
    Route::get('/profil', [UserController::class, 'show_profil']);
    Route::patch('/profile', [UserController::class, 'update'])->name('profil.update');

    Route::get('/scan-makanan', [MakananController::class, 'index'])->name('scan.index');
    Route::post('/scan-makanan/generate', [MakananController::class, 'generate_makanan'])->name('scan.generate');
    Route::get('/rekomendasi', [MakananController::class, 'show_rekomendasi']);


    Route::get('/riwayat', [MakananController::class, 'riwayat'])->name('riwayat.index');
    Route::get('/riwayat/{slug}', [MakananController::class, 'show'])->name('riwayat.show');

    Route::get('/rekomendasi', [RekomendasiController::class, 'index'])->name('rekomendasi.index');
    Route::post('/rekomendasi/generate', [RekomendasiController::class, 'generate'])->name('rekomendasi.generate');
});
