<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|unique:categories,name|min:3',
        ];
    }
    public function messages()
    {
        return [
            'name.min' => 'Category name has minimum of 3 chars',
            'name.required' => 'Category name is required, you have to fill it!',
            'name.unique' => 'Category name is unique, you have to choose a different name!',
        ] ;
    }
}
