<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('estado_pago_sesion', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->unique();
            $table->timestamps();
        });

        // Opcional: insertar algunos estados iniciales
        DB::table('estado_pago_sesion')->insert([
            ['nombre' => 'pendiente', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'parcial', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'pagado', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estado_pago_sesion');
    }
};
