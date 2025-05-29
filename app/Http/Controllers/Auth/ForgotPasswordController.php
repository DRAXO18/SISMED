<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Mail\PasswordResetMail;

class ForgotPasswordController extends Controller
{
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Correo no registrado',
            ], 404);
        }


        // Generar token con expiración (60 minutos)
        $token = Str::random(60);
        $expiration = Carbon::now()->addMinutes(60);

        $user->update([
            'password_reset_token' => $token,
            'token_expiration' => $expiration,
            'failed_attempts' => 0,  // ← Ya lo tenías
            'is_blocked' => 0,
            
        ]);

        // Enviar correo
        Mail::to($user->email)->send(new PasswordResetMail($token));

        return response()->json([
            'success' => true,
            'message' => 'Enlace enviado a tu correo',
            'token' => $token, // Opcional para depuración
        ]);
    }
}
