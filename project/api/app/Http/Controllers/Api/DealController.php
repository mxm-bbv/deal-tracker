<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Requests\StoreDealRequest;
use App\Http\Resources\DealCollection;
use App\Models\Deals;
use Illuminate\Http\JsonResponse;

class DealController extends ApiController
{
    public function index(): JsonResponse
    {
        return $this->success(data: new DealCollection(Deals::all()));
    }

    public function store(StoreDealRequest $request): JsonResponse
    {

        $deals = Deals::create($request->validated());

        return $this->success(data: $deals, code: 201, message: 'Deal created successfully');
    }
}
