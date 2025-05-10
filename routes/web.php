<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;

// Ruta para mostrar el formulario de login

// Ruta para procesar el login
Route::post('/login', [LoginController::class, 'login']);

// Ruta para manejar la redirección después de loguearse correctamente
Route::get('/dashboard', [LoginController::class, 'dashboard'])->middleware('auth')->name('dashboard');

// Ruta para cerrar sesión
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth')->name('logout');

// Ruta por defecto para que React maneje el frontend (asegurándote de que Laravel solo maneja el backend)
Route::get('/', function () {
    return view('welcome'); // O puedes redirigir a una vista de React, si prefieres
});
