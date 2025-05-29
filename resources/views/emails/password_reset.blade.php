<!DOCTYPE html>
<html>
<head>
    <title>Restablecer contraseña</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #3490dc;
            color: white !important;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Restablecimiento de contraseña</h2>
        <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.</p>
        
        <p>Para continuar con el proceso, haz clic en el siguiente botón:</p>
        
        <a href="{{ config('app.frontend_url') }}/reset-password/{{ $token }}" class="button">
            Restablecer contraseña
        </a>
        
        <p>Este enlace expirará en 60 minutos. Si no solicitaste este cambio, puedes ignorar este mensaje.</p>
        
        <p>Si tienes problemas para hacer clic en el botón, copia y pega esta URL en tu navegador:</p>
        <p>{{ config('app.frontend_url') }}/reset-password/{{ $token }}</p>
        
        <p>Gracias,<br>El equipo de {{ config('app.name') }}</p>
    </div>
</body>
</html>