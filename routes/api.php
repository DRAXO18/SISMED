<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\GetPermissions;
use App\Http\Controllers\RolAccesoController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Rutas públicas
Route::post('/login', [LoginController::class, 'login']);

Route::post('/password/forgot', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('/password/reset', [ResetPasswordController::class, 'reset']);

// // Rutas públicas (fuera del middleware para testing)
// Route::prefix('roles-accesos')->group(function () {

//     // Crear
//     Route::post('/roles', [RolAccesoController::class, 'createRole']);
//     Route::post('/permissions', [RolAccesoController::class, 'createPermission']);

//     // Listar
//     Route::get('/roles', [RolAccesoController::class, 'getRoles']);
//     Route::get('/permissions', [RolAccesoController::class, 'getPermissions']);
//     Route::get('/users', [RolAccesoController::class, 'getUsers']);
//     Route::get('/accesos', [RolAccesoController::class, 'getAccesos']);

//     // Asignaciones
//     Route::post('/assign-permissions-to-role', [RolAccesoController::class, 'assignPermissionsToRole']);
//     Route::post('/assign-roles-to-user', [RolAccesoController::class, 'assignRolesToUser']);

//     // Consultas
//     Route::get('/roles/{roleId}/permissions', [RolAccesoController::class, 'getRolePermissions']);
//     Route::get('/roles-with-permissions', [RolAccesoController::class, 'getAllRolesWithPermissions']);
//     Route::get('/users/{userId}/roles', [RolAccesoController::class, 'getUserRoles']);
// });

Route::middleware(['auth:api'])->group(function () {
    Route::post('/logout', [LoginController::class, 'logout']);
    Route::get('/user', [LoginController::class, 'user']);
    Route::get('/user-permissions', [GetPermissions::class, 'userPermissions']);

    Route::prefix('roles-accesos')->group(function () {

        // Crear
        Route::post('/create-role', [RolAccesoController::class, 'createRole']);
        Route::post('/permissions', [RolAccesoController::class, 'createPermission']);

        // Listar
        Route::get('/roles', [RolAccesoController::class, 'getRoles']);
        Route::get('/permissions', [RolAccesoController::class, 'getPermissions']);
        Route::get('/users', [RolAccesoController::class, 'getUsers']);
        Route::get('/accesos', [RolAccesoController::class, 'getAccesos']);

        // Asignaciones
        Route::post('/assign-permissions-to-role', [RolAccesoController::class, 'assignPermissionsToRole']);
        Route::post('/assign-roles-to-user', [RolAccesoController::class, 'assignRolesToUser']);

        // Consultas
        Route::get('/roles/{roleId}/permissions', [RolAccesoController::class, 'getRolePermissions']);
        Route::get('/roles-with-permissions', [RolAccesoController::class, 'getAllRolesWithPermissions']);
        Route::get('/users/{userId}/roles', [RolAccesoController::class, 'getUserRoles']);
    });
});

// Route::middleware('auth:api')->post('/logout', [LoginController::class, 'logout']);