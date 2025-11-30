<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MakananController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Welcome');
});

// Auth Routes
Route::get('/register', [AuthController::class, 'registerForm'])->name('register');
Route::post('/register', [AuthController::class, 'register']);
Route::get('/login', [AuthController::class, 'loginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/personalisasi', [UserController::class, 'index'])->name('personalisasi');
    Route::post('/personalisasi', [UserController::class, 'store'])->name('personalisasi.store');

    Route::get('/makanan', [MakananController::class, 'index'])->name('makanan.index');
    Route::post('/makanan/generate', [MakananController::class, 'generate_makanan'])->name('makanan.generate');
Route::get('/makanan/{id}', [MakananController::class, 'show'])
    ->name('makanan.show');
});




