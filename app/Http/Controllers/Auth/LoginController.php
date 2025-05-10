<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    // Método login
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();

            // Crea un token con Sanctum
            $token = $user->createToken('auth_token')->plainTextToken;

            // Aquí es importante usar 'Bearer' en la respuesta de la cabecera
            return response()->json([
                'message' => 'Login exitoso',
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user
            ], 200);
        }

        return response()->json([
            'message' => 'Credenciales inválidas'
        ], 401);
    }


    // Logout usando Sanctum
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete(); // Revoca todos los tokens

        return response()->json([
            'message' => 'Sesión cerrada'
        ]);
    }

    // Obtener datos del usuario autenticado
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
