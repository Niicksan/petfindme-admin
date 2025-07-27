<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $userId = $this->route('user');

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($userId),
            ],
            'password' => [
                'nullable',
                'string',
                'min:5',
                'confirmed',
            ],
            'password_confirmation' => [
                'nullable',
                'string',
            ],
            'role_id' => ['required', 'integer', 'exists:roles,id'],
            'is_active' => ['boolean'],
        ];
    }

    /**
     * Configure the validator instance.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $password = $this->input('password');
            $passwordConfirmation = $this->input('password_confirmation');

            // If one password field is filled, both must be filled
            if (!empty($password) && empty($passwordConfirmation)) {
                $validator->errors()->add('password_confirmation', 'The password confirmation field is required when password is present.');
            }

            if (empty($password) && !empty($passwordConfirmation)) {
                $validator->errors()->add('password', 'The password field is required when password confirmation is present.');
            }
        });
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'The name field is required.',
            'name.string' => 'The name must be a string.',
            'name.min' => 'The name must be at least 3 characters.',
            'name.max' => 'The name may not be greater than 255 characters.',
            'email.required' => 'The email field is required.',
            'email.string' => 'The email must be a string.',
            'email.email' => 'The email must be a valid email address.',
            'email.max' => 'The email may not be greater than 255 characters.',
            'email.unique' => 'The email has already been taken.',
            'password.string' => 'The password must be a string.',
            'password.min' => 'The password must be at least 5 characters.',
            'password.confirmed' => 'The password confirmation does not match.',
            'password_confirmation.required' => 'The password confirmation field is required when password is present.',
            'role_id.required' => 'The role field is required.',
            'role_id.integer' => 'The role must be a valid integer.',
            'role_id.exists' => 'The selected role is invalid.',
            'is_active.boolean' => 'The active status must be true or false.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'name' => 'name',
            'email' => 'email',
            'password' => 'password',
            'password_confirmation' => 'password confirmation',
            'role_id' => 'role',
            'is_active' => 'active status',
        ];
    }
}
