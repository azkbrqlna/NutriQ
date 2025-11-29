<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Makanan extends Model
{
    protected $fillable = [
        'user_id',
        'nama',
        'tanggal',
        'jam',
        'foto',
        'total_kalori',
        'total_protein',
        'total_lemak',
        'total_karbohidrat',
        'total_serat',
        'total_natrium',
        'total_gula_tambahan',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function detailMakanans()
    {
        return $this->hasMany(DetailMakanan::class);
    }
}
