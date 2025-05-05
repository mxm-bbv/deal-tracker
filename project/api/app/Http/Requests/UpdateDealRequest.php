<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDealRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'city_id' => 'exists:cities,id|sometimes|required|int',
            'status' => 'sometimes|required|string|in:accepted,rejected',
            'reason' => 'required_if:status,rejected|nullable|string|max:1000',
        ];
    }
}
