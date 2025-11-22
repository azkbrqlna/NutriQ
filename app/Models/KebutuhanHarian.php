<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KebutuhanHarian extends Model
{
    protected $fillable = [
        'kalori',
        'protein',
        'lemak',
        'karbohidrat',
        'serat',
        'natrium',
        'gula_tambahan',
    ];
}
