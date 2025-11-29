<?php

namespace App\Http\Controllers;

use App\Models\KebutuhanHarian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $kebutuhan = KebutuhanHarian::where('user_id', Auth::user()->id)->first();

        return Inertia::render('Dashboard',[
            'user' => Auth::user(),
            'kebutuhan' => $kebutuhan,
        ]);
    }
}
