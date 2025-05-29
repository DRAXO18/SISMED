<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Cookie;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $user = User::where('email', $credentials['email'])->first();

        // Verificar si el usuario existe y está bloqueado primero
        if ($user && $user->is_blocked) {
            return response()->json([
                'message' => 'Cuenta bloqueada. Por favor restablezca su contraseña.',
                'blocked' => true
            ], 403);
        }

        // Verificar credenciales
        if (!$token = JWTAuth::attempt($credentials)) {
            if ($user) {
                $user->failed_attempts += 1;

                // Bloquear después de 3 intentos fallidos (ahora es en el 4to)
                if ($user->failed_attempts >= 4) {
                    $user->is_blocked = true;
                    $user->save();

                    return response()->json([
                        'message' => 'Cuenta bloqueada. Por favor restablezca su contraseña.',
                        'blocked' => true,
                        'attempts_left' => 0
                    ], 401);
                }

                $user->save();

                $attempts_left = 4 - $user->failed_attempts;

                return response()->json([
                    'message' => $attempts_left === 1 ?
                        'Le queda un intento más antes de que su cuenta sea bloqueada.' :
                        'Credenciales inválidas. Intentos restantes: ' . $attempts_left,
                    'attempts_left' => $attempts_left
                ], 401);
            }

            // Si el usuario no existe
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }

        // Éxito: reiniciar intentos fallidos
        $user->failed_attempts = 0;
        $user->last_login_at = now();
        $user->save();

        // Guardar el token en una cookie httpOnly
        $cookie = cookie('token', $token, 60, '/', null, true, true, false, 'Lax');

        return response()->json([
            'message' => 'Login exitoso',
            'user' => $user,
        ])->withCookie($cookie);
    }

    public function logout(Request $request)
    {
        return response()->json(['message' => 'Sesión cerrada'])
        ->withCookie(Cookie::forget('token'));
    }

    // Obtener datos del usuario autenticado
    public function user(Request $request)
    {
        return response()->json(Auth::user());
    }
}
