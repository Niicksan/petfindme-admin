<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAuthPageAccess
{
    /**
     * Require query param "access" to match the configured secret for this page,
     * or a prior successful check stored in the session (after a valid ?access=…,
     * or after logout — see AuthenticatedSessionController::destroy).
     *
     * @param  string  $page  "login" or "register"
     */
    public function handle(Request $request, Closure $next, string $page): Response
    {
        $secret = match ($page) {
            'login' => config('auth.access.login_secret'),
            'register' => config('auth.access.register_secret'),
            default => null,
        };

        if ($secret === null || $secret === '') {
            return $next($request);
        }

        $sessionKey = 'auth_page_access_' . $page;
        $provided = $request->query('access');
        if ($provided === null || $provided === '') {
            $provided = $request->input('access');
        }

        $providedPresent = is_string($provided) && $provided !== '';

        // If the client sent access=…, only a matching secret may pass (do not fall back to session).
        if ($providedPresent) {
            if (hash_equals($secret, $provided)) {
                $request->session()->put($sessionKey, true);

                return $next($request);
            }

            $request->session()->forget($sessionKey);

            abort(404);
        }

        // No access param on this request (e.g. POST body): allow after a prior successful GET.
        if ($request->session()->get($sessionKey) === true) {
            return $next($request);
        }

        abort(404);
    }
}
