<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSignalRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|min:3|max:255',
            'city_id' => 'required|exists:cities,id',
            'category_id' => 'required|exists:categories,id',
            'geolocation' => 'required|json',
            'contact_name' => 'required|string|min:3|max:255',
            'phone' => 'required|digits_between:5,13',
            'description' => 'required|string|min:20|max:3000',
        ];
    }
}