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
        Schema::create('saldo_cliente', function (Blueprint $table) {
            $table->id();

            $table->foreignId('cliente_id')->constrained('users')->onDelete('cascade');

            $table->decimal('monto', 10, 2)->default(0); // Saldo actual disponible

            $table->timestamp('fecha_actualizacion')->useCurrent();

            $table->timestamps();

            $table->index('cliente_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('saldo_cliente');
    }
};
