<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AcceptJson
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$this->isAcceptJson($request)) {
            return $this->jsonErrorResponse($request->header('Accept'));
        }

        if ($request->isMethod('OPTIONS')) {
            return response('', Response::HTTP_NO_CONTENT)->withHeaders($this->corsHeaders());
        }

        $response = $next($request);
        return $response->withHeaders($this->corsHeaders());
    }

    /**
     * Check if the Accept header contains "application/json".
     *
     * @param Request $request
     * @return bool
     */
    private function isAcceptJson(Request $request): bool
    {
        return str_contains($request->header('Accept', ''), 'application/json');
    }

    /**
     * Return a standardized JSON error response.
     *
     * @param string|null $detail
     * @return JsonResponse
     */
    private function jsonErrorResponse(?string $detail): JsonResponse
    {
        return response()->json([
            'status' => false,
            'data' => null,
            'errors' => ['Invalid Accept header', $detail],
            'message' => 'Fail',
        ], Response::HTTP_BAD_REQUEST);
    }

    /**
     * Define CORS headers.
     *
     * @return array
     */
    private function corsHeaders(): array
    {
        return [
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Credentials' => 'true',
            'Access-Control-Allow-Headers' => 'X-Requested-With, Content-Type, X-Token-Auth, Authorization',
        ];
    }
}
