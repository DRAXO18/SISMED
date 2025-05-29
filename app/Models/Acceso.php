<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Acceso extends Model
{
    use HasFactory;

    protected $table = 'accesos';
    protected $guard_name = 'api';
    
    protected $fillable = [
        'nombre',
        'tipo',
        'padre_id',
        'permiso'
    ];

    // Relación con accesos padre
    public function padre()
    {
        return $this->belongsTo(Acceso::class, 'padre_id');
    }

    // Relación con accesos hijos
    public function hijos()
    {
        return $this->hasMany(Acceso::class, 'padre_id');
    }

    // Scope para obtener solo accesos padre
    public function scopePadres($query)
    {
        return $query->where('tipo', 'acceso')->where('padre_id', 0);
    }

    // Scope para obtener subaccesos
    public function scopeSubaccesos($query)
    {
        return $query->where('tipo', 'subacceso')->where('padre_id', '>', 0);
    }
}