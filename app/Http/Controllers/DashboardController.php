<?php

namespace App\Http\Controllers;

use App\Models\KebutuhanHarian;
use App\Models\Makanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $kebutuhan = KebutuhanHarian::where('user_id', $user->id)->first();

        $tanggal = $request->input('tanggal', now()->toDateString());

        $makananHariIni = Makanan::where('user_id', $user->id)
        ->whereDate('tanggal', $tanggal)
        ->selectRaw('
            SUM(total_kalori) as kalori,
            SUM(total_protein) as protein,
            SUM(total_karbohidrat) as karbohidrat,
            SUM(total_lemak) as lemak,
            SUM(total_serat) as serat,
            SUM(total_natrium) as natrium,
            SUM(total_gula_tambahan) as gula_tambahan
        ')
        ->first();

        dd($makananHariIni, $kebutuhan);

        return Inertia::render('Dashboard', [
            'user' => $user,
            'kebutuhan' => $kebutuhan,
            'makananHariIni' => $makananHariIni,
            'tanggal' => $tanggal
        ]);
    }

}
