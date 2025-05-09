<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Limpia la caché
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Crea el permiso por defecto
        $permiso = Permission::firstOrCreate(['name' => 'vista usuarios']);

        // Crea el rol por defecto
        $superAdmin = Role::firstOrCreate(['name' => 'superadmin']);

        // Asigna el permiso al rol
        $superAdmin->givePermissionTo($permiso);

        // Opcional: Asigna el rol a un usuario por defecto (ej. id = 1)
        $usuario = User::find(1); // o busca por email
        if ($usuario) {
            $usuario->assignRole('superadmin');
        }
    }
}
