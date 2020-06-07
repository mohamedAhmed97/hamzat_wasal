<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
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
            'title' => 'required|max:255|unique:posts,title,'.$this->post,
            'user_id' => 'required|exists:users,id|numeric',
            'category_id' => 'required|exists:categories,id|numeric',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Post title is required, you have to fill it!',
            'title.unique' => 'Post title is unique, you have to choose a different title!',
            
        ] ;
    }
}
