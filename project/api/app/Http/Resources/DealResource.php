<?php

namespace App\Http\Resources;

use App\Models\Deals;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Deals
 */
class DealResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'city' => $this->city_id,
            'status' => $this->status,
            'reason' => $this->reason,
            'date' => $this->created_at->format('Y-m-d'),
        ];
    }
}
