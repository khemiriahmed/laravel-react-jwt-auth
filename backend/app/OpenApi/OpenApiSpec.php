<?php

namespace App\OpenApi;

use OpenApi\Attributes as OA;

#[OA\Info(
    title: 'Laravel React JWT Auth API',
    version: '1.0.0',
    description: 'API REST Laravel 12 avec authentification JWT et rôles USER / ADMIN.'
)]
#[OA\Server(
    url: 'http://127.0.0.1:8000',
    description: 'Serveur local Laravel'
)]
#[OA\SecurityScheme(
    securityScheme: 'bearerAuth',
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    description: 'Saisir uniquement le token JWT obtenu après la connexion.'
)]
class OpenApiSpec
{
}

