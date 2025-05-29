<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use App\Models\Acceso;
use Illuminate\Http\JsonResponse;

class RolAccesoController extends Controller
{
    // Crear rol
    public function createRole(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|unique:roles,name'
        ]);

        // Especificar el guard explícitamente
        $role = Role::create([
            'name' => $request->name,
            'guard_name' => 'web'
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Rol creado exitosamente',
            'data' => $role
        ]);
    }

    // Crear permiso
    public function createPermission(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|unique:permissions,name'
        ]);

        // Especificar el guard explícitamente
        $permission = Permission::create([
            'name' => $request->name,
            'guard_name' => 'web'
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Permiso creado exitosamente',
            'data' => $permission
        ]);
    }

    // Listar roles
    public function getRoles(): JsonResponse
    {
        $roles = Role::all();
        return response()->json($roles);
    }

    // Listar permisos
    public function getPermissions(): JsonResponse
    {
        $permissions = Permission::all();
        return response()->json($permissions);
    }

    // Listar usuarios con idTipo_usuario = 1
    public function getUsers(): JsonResponse
    {
        $users = User::where('idTipo_usuario', 1)
                    ->select('id', 'nombre', 'apellido_paterno', 'apellido_materno', 'email')
                    ->get();
        return response()->json($users);
    }

    // Asignar permisos a rol - MÉTODO CORREGIDO
    public function assignPermissionsToRole(Request $request): JsonResponse
    {
        $request->validate([
            'role_id' => 'required|exists:roles,id',
            'permission_ids' => 'required|array',
            'permission_ids.*' => 'exists:permissions,id'
        ]);

        try {
            // Buscar el rol especificando el guard correcto
            $role = Role::where('guard_name', 'web')->findOrFail($request->role_id);
            
            // Obtener permisos con el mismo guard
            $permissions = Permission::where('guard_name', 'web')
                                   ->whereIn('id', $request->permission_ids)
                                   ->get();
            
            $role->syncPermissions($permissions);
            
            return response()->json([
                'success' => true,
                'message' => 'Permisos asignados al rol exitosamente'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al asignar permisos: ' . $e->getMessage()
            ], 400);
        }
    }

    // Asignar roles a usuario
    public function assignRolesToUser(Request $request): JsonResponse
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'role_ids' => 'required|array',
            'role_ids.*' => 'exists:roles,id'
        ]);

        try {
            $user = User::findOrFail($request->user_id);
            
            // Buscar roles con el guard correcto
            $roles = Role::where('guard_name', 'web')
                        ->whereIn('id', $request->role_ids)
                        ->get();
            
            $user->syncRoles($roles);
            
            return response()->json([
                'success' => true,
                'message' => 'Roles asignados al usuario exitosamente'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al asignar roles: ' . $e->getMessage()
            ], 400);
        }
    }

    // Obtener permisos de un rol
    public function getRolePermissions($roleId): JsonResponse
    {
        try {
            $role = Role::where('guard_name', 'web')
                       ->with('permissions')
                       ->findOrFail($roleId);
            
            return response()->json([
                'role' => $role->name,
                'permissions' => $role->permissions
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Rol no encontrado: ' . $e->getMessage()
            ], 404);
        }
    }

    // Obtener todos los roles con sus permisos
    public function getAllRolesWithPermissions(): JsonResponse
    {
        $roles = Role::where('guard_name', 'web')->with('permissions')->get();
        
        return response()->json($roles);
    }

    // Obtener accesos jerarquicos para UI
    public function getAccesos(): JsonResponse
    {
        $accesos = Acceso::with('hijos')->padres()->get();
        
        return response()->json($accesos);
    }

    // Obtener roles de un usuario
    public function getUserRoles($userId): JsonResponse
    {
        $user = User::with('roles')->findOrFail($userId);
        
        return response()->json([
            'user' => $user->nombre . ' ' . $user->apellido_paterno,
            'roles' => $user->roles
        ]);
    }
}