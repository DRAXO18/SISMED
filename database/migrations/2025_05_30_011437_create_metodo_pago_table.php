<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;


return new class extends Migration {
    public function up(): void
    {
        Schema::create('metodo_pago', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->unique();
            $table->timestamps();
            $table->string('descripcion')->nullable(); // Opcional

        });

        // Insertar métodos comunes iniciales (opcional)
        DB::table('metodo_pago')->insert([
            ['nombre' => 'efectivo', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'tarjeta', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'transferencia', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'paypal', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('metodo_pago');
    }
};
