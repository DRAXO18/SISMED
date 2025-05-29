<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GetPermissions extends Controller
{
    public function userPermissions(Request $request)
{
    $user = $request->user(); // usuario autenticado
    $permissions = $user->getAllPermissions()->pluck('name'); // obtienes solo los nombres de permisos
    return response()->json(['permissions' => $permissions]);
}

}
