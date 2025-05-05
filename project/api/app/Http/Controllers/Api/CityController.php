<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Resources\CityCollection;
use App\Models\Cities;
use Illuminate\Http\JsonResponse;

class CityController extends ApiController
{
    public function index(): JsonResponse
    {
        return $this->success(data: new CityCollection(Cities::all()));
    }
}
