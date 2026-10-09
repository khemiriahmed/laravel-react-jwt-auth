<?php

namespace App\OpenApi;

use OpenApi\Attributes as OA;

#[OA\Tag(
    name: 'Authentication',
    description: 'Inscription, connexion et gestion du token JWT'
)]

#[OA\Post(
    path: '/api/register',
    operationId: 'register',
    tags: ['Authentication'],
    summary: 'Créer un compte utilisateur ',
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: [
                'name',
                'email',
                'password',
                'password_confirmation'
            ],
            properties: [
                new OA\Property(
                    property: 'name',
                    type: 'string',
                    example: 'Ahmed'
                ),
                new OA\Property(
                    property: 'email',
                    type: 'string',
                    format: 'email',
                    example: 'ahmed@example.com'
                ),
                new OA\Property(
                    property: 'password',
                    type: 'string',
                    format: 'password',
                    example: 'Password123'
                ),
                new OA\Property(
                    property: 'password_confirmation',
                    type: 'string',
                    format: 'password',
                    example: 'Password123'
                )
            ]
        )
    ),
    responses: [
        new OA\Response(
            response: 201,
            description: 'Compte créé avec succès'
        ),
        new OA\Response(
            response: 422,
            description: 'Données invalides'
        )
    ]
)]

#[OA\Post(
    path: '/api/login',
    operationId: 'login',
    tags: ['Authentication'],
    summary: 'Connecter un utilisateur',
    requestBody: new OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['email', 'password'],
            properties: [
                new OA\Property(
                    property: 'email',
                    type: 'string',
                    format: 'email',
                    example: 'ahmed@example.com'
                ),
                new OA\Property(
                    property: 'password',
                    type: 'string',
                    format: 'password',
                    example: 'Password123'
                )
            ]
        )
    ),
    responses: [
        new OA\Response(
            response: 200,
            description: 'Connexion réussie, token retourné'
        ),
        new OA\Response(
            response: 422,
            description: 'Identifiants incorrects'
        )
    ]
)]

#[OA\Get(
    path: '/api/me',
    operationId: 'getCurrentUser',
    tags: ['Authentication'],
    summary: 'Récupérer le profil connecté',
    security: [['bearerAuth' => []]],
    responses: [
        new OA\Response(
            response: 200,
            description: 'Profil utilisateur retourné'
        ),
        new OA\Response(
            response: 401,
            description: 'Non authentifié'
        )
    ]
)]

#[OA\Post(
    path: '/api/logout',
    operationId: 'logout',
    tags: ['Authentication'],
    summary: 'Déconnecter l’utilisateur',
    security: [['bearerAuth' => []]],
    responses: [
        new OA\Response(
            response: 200,
            description: 'Déconnexion réussie'
        ),
        new OA\Response(
            response: 401,
            description: 'Non authentifié'
        )
    ]
)]

#[OA\Post(
    path: '/api/refresh',
    operationId: 'refreshToken',
    tags: ['Authentication'],
    summary: 'Actualiser le token JWT',
    security: [['bearerAuth' => []]],
    responses: [
        new OA\Response(
            response: 200,
            description: 'Nouveau token retourné'
        ),
        new OA\Response(
            response: 401,
            description: 'Token invalide ou expiré'
        )
    ]
)]
class AuthDocumentation
{
}

