<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    // Muestra el formulario de login
    public function showLoginForm()
    {
        return view('auth.login');
    }

    // Procesa el formulario de login
    public function login(Request $request)
    {
        // Validar los datos del formulario
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Intentar autenticar al usuario
        if (Auth::attempt([
            'email' => $request->email,
            'password' => $request->password
        ], $request->remember)) {
            // Si la autenticación es exitosa, redirige al dashboard
            return redirect()->intended(route('dashboard'));
        }

        // Si la autenticación falla, regresa con un error
        return back()->withErrors([
            'email' => 'Las credenciales no coinciden con nuestros registros.',
        ]);
    }

    // Función para redirigir al dashboard
    public function dashboard()
    {
        return view('dashboard');
    }

    // Cierra la sesión
    public function logout(Request $request)
    {
        Auth::logout();
        return redirect('/');
    }
}
