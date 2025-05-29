<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Limpia la caché de permisos
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Lista de permisos basados en el menú _nav
        $permisos = [
            'vista_dashboard',
            'vista usuarios',
            'vista roles/accesos',
            'vista_citas',
            'vista_sesiones',
            'vista_pagos',
            'vista_reportes',
            'vista_tratamientos',
        ];

        // Crear permisos si no existen
        foreach ($permisos as $permiso) {
            Permission::firstOrCreate(['name' => $permiso]);
        }

        // Crear el rol administrador
        $administrador = Role::firstOrCreate(['name' => 'administrador']);

        // Asignar todos los permisos al rol
        $administrador->syncPermissions($permisos); // reemplaza todos los permisos anteriores del rol

        // Asignar el rol administrador al usuario con ID 7
        $usuario = User::find(7);
        if ($usuario) {
            // Si quieres reemplazar todos los roles del usuario:
            $usuario->syncRoles(['administrador']);

            // Si solo quieres agregarlo sin quitar los anteriores:
            // $usuario->assignRole('administrador');
        }
    }
}
