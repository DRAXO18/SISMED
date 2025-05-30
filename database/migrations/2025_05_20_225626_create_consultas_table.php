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
        Schema::create('consultas', function (Blueprint $table) {
            $table->id();

            // Cliente puede ser null si no está registrado
            $table->foreignId('cliente_id')->nullable()->constrained('users')->nullOnDelete();

            // Usuario del sistema que registró la consulta (ej. recepcionista)
            $table->foreignId('responsable_id')->constrained('users')->onDelete('cascade');

            // Nombre libre del especialista (texto temporal, no FK)
            $table->string('especialista');

            $table->dateTime('fecha');
            $table->text('motivo');
            $table->text('observaciones')->nullable();

            // Pago asociado si fue cobrada
            $table->foreignId('pago_id')->nullable()->constrained('pagos')->nullOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultas');
    }
};
