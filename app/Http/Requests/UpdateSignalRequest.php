<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSignalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $geolocation = $this->input('geolocation');
        if ($this->has('geolocation') && \is_string($geolocation)) {
            $decoded = json_decode($geolocation, true);
            if (json_last_error() === JSON_ERROR_NONE && \is_array($decoded)) {
                $this->merge(['geolocation' => $decoded]);
            }
        }

        $images = $this->input('images');
        if ($this->has('images') && \is_string($images)) {
            $decoded = json_decode($images, true);
            if (json_last_error() === JSON_ERROR_NONE && \is_array($decoded)) {
                $this->merge(['images' => $decoded]);
            }
        }
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|min:3|max:255',
            'city_id' => 'required|exists:cities,id',
            'category_id' => 'required|exists:categories,id',
            'geolocation' => 'required|array',
            'contact_name' => 'required|string|min:3|max:255',
            'phone' => 'required|digits_between:5,13',
            'description' => 'required|string|min:20|max:3000',
            'status_id' => 'required|exists:statuses,id',
            'images' => 'nullable|array',
            'images.*.id' => 'required',
            'images.*.order' => 'sometimes|integer|min:0',
            'new_images' => 'nullable|array',
            'new_images.*' => 'file|image|max:20480',
            'from_preview' => 'sometimes|boolean',
        ];
    }
}
