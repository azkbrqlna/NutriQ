<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

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

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($makanan) {
            $slug = Str::slug($makanan->nama);
            $unique = Str::random(5);
            $makanan->slug = "{$slug}-{$unique}";
        });
    }
}
