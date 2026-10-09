<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'message' => 'Unauthenticated.',
            ], 401);
        }

        if (strtoupper((string) $user->role) !== 'ADMIN') {
            return response()->json([
                'message' => 'Forbidden. Administrator access required.',
            ], 403);
        }

        return $next($request);
    }
}
