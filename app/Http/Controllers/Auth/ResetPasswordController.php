<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class ResetPasswordController extends Controller
{
    public function reset(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:8',
        ]);

        $user = User::where('email', $request->email)
                   ->where('password_reset_token', $request->token)
                   ->first();

        if (!$user) {
            return response()->json(['message' => 'Token inválido.'], 400);
        }

        if (Carbon::now()->gt($user->token_expiration)) {
            return response()->json(['message' => 'El token ha expirado.'], 400);
        }

        $user->update([
            'password' => Hash::make($request->password),
            'password_reset_token' => null,
            'token_expiration' => null,
            'failed_attempts' => 0,
            'is_blocked' => 0,
        ]);

        return response()->json(['message' => 'Contraseña actualizada correctamente.']);
    }
}