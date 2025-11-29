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
        Schema::create('makanans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('nama');
            $table->date('tanggal');
            $table->time('jam');
            $table->string('foto');
            $table->integer('total_kalori');
            $table->integer('total_protein');
            $table->integer('total_karbohidrat');
            $table->integer('total_lemak');
            $table->integer('total_serat');
            $table->integer('total_natrium');
            $table->integer('total_gula_tambahan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('makanans');
    }
};
