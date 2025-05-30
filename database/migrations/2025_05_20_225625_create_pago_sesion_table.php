<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('pago_sesion', function (Blueprint $table) {
            $table->id();

            $table->foreignId('sesion_id')->constrained('sesiones')->onDelete('cascade');

            $table->foreignId('pago_id')->constrained('pagos')->onDelete('cascade');

            $table->decimal('monto', 10, 2);

            $table->timestamps();

            $table->index('sesion_id');
            $table->index('pago_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pago_sesion');
    }
};
