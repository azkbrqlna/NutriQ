<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KebutuhanHarian extends Model
{
    protected $fillable = [
        'user_id',
        'kalori',
        'protein',
        'lemak',
        'karbohidrat',
        'serat',
        'natrium',
        'gula_tambahan',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
