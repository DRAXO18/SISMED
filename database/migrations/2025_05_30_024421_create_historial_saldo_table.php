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
        Schema::create('historial_saldo', function (Blueprint $table) {
            $table->id();

            $table->foreignId('cliente_id')->constrained('users')->onDelete('cascade');

            $table->decimal('monto', 10, 2); // Monto del movimiento

            $table->enum('tipo', ['ingreso', 'egreso']); // ingreso: depositó saldo, egreso: lo usó

            $table->text('nota')->nullable(); // ej. “Pago adelantado”, “Aplicado a sesión #3”

            $table->foreignId('usuario_id')->nullable()->constrained('users'); // Usuario del sistema que registró el movimiento

            $table->timestamp('fecha')->useCurrent();

            $table->timestamps();

            $table->index(['cliente_id', 'fecha']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('historial_saldo');
    }
};
