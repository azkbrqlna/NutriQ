<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('detail_makanans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('makanan_id')->constrained()->onDelete('cascade');
            $table->string('nama');
            $table->integer('kalori');
            $table->integer('protein');
            $table->integer('lemak');
            $table->integer('karbohidrat');
            $table->integer('serat');
            $table->integer('natrium');
            $table->integer('gula_tambahan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_makanans');
    }
};
