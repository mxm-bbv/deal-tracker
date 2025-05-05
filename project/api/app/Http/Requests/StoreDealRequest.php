<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDealRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'city_id' => 'exists:cities,id|required|int',
            'status' => 'required|string|in:accepted,rejected',
            'reason' => 'required_if:status,rejected|nullable|string|max:1000',
        ];
    }
}
