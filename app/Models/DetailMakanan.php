<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetailMakanan extends Model
{
    protected $fillable = [
        'makanan_id',
        'nama',
        'kalori',
        'protein',
        'lemak',
        'karbohidrat',
        'serat',
        'natrium',
        'gula_tambahan',
    ];

    public function makanan()
    {
        return $this->belongsTo(Makanan::class);
    }
}
