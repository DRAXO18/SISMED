<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Buscar el rol 'superadmin' que ya ha sido creado en el RolesAndPermissionsSeeder
        $superAdmin = Role::where('name', 'superadmin')->first();

        // Si no existe, lo creamos (aunque debería existir gracias al RolesAndPermissionsSeeder)
        if (!$superAdmin) {
            $superAdmin = Role::create(['name' => 'superadmin']);
        }

        // Crear el usuario Superadmin
        $user = User::create([
            'nombre' => 'Juan',
            'apellido_paterno' => 'Perez',
            'apellido_materno' => 'Lopez',
            'email' => 'superadmin@ejemplo.com',
            'password' => Hash::make('superadmin123'), // Contraseña ficticia
            'numero_identificacion' => 123456789,
            'idTipo_identificacion' => 1, // Tipo de identificación
            'fecha_nacimiento' => '1990-01-01',
            'telefono' => '123456789',
            'idTipo_usuario' => 1, // Tipo de usuario
            'activo' => 1,
        ]);

        // Asignar el rol de 'superadmin' al usuario
        $user->assignRole('superadmin');
    }
}
