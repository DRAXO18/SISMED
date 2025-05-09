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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nombre'); // Nombre del usuario
            $table->string('apellido_paterno'); // Apellido paterno
            $table->string('apellido_materno')->nullable(); // Apellido materno
            $table->string('email')->nullable()->unique(); // Email, puede ser nulo
            $table->timestamp('email_verified_at')->nullable(); // Verificación del email
            $table->string('password'); // Contraseña
            $table->rememberToken();
            $table->bigInteger('numero_identificacion'); // Número de identificación
            $table->foreignId('idTipo_identificacion')->nullable()->constrained('tipos_identificacion')->onDelete('set null');
            $table->date('fecha_nacimiento')->nullable(); // Fecha de nacimiento
            $table->string('telefono')->nullable(); // Teléfono
            $table->foreignId('idTipo_usuario')->constrained('tipos_usuarios')->onDelete('cascade');
            $table->foreignId('role_id')->constrained()->onDelete('cascade'); // Relación con la tabla de roles
            $table->tinyInteger('activo')->default(1); // 1 = sí, 0 = no
            $table->timestamp('last_login_at')->nullable(); // Fecha del último inicio de sesión
            $table->integer('failed_attempts')->default(0); // Intentos fallidos de inicio de sesión
            $table->string('password_reset_token')->nullable(); // Token para recuperación de contraseña
            $table->timestamp('token_expiration')->nullable(); // Expiración del token
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary(); // Email para el token
            $table->string('token'); // Token para recuperación
            $table->timestamp('created_at')->nullable(); // Fecha de creación del token
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary(); // ID de la sesión
            $table->foreignId('user_id')->nullable()->index(); // ID del usuario
            $table->string('ip_address', 45)->nullable(); // Dirección IP
            $table->text('user_agent')->nullable(); // Agente de usuario
            $table->longText('payload'); // Datos de la sesión
            $table->integer('last_activity')->index(); // Última actividad
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
