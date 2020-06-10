<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
            'name' => 'required|max:255',
            'email' => 'required|unique:admins|email',
            'password' => 'required|min:6|confirmed',
            /* 'avatar' => 'required', */
        ];
    }

    //message
    public function messages()
    {
        return [
            'name.min' => 'User name has minimum of 3 chars',
            'name.required' => 'User name is required, you have to fill it!',
            'name.unique' => 'User name is unique, you have to choose a different title!',
            'email.required'=>'User name is required, you have to fill it!',
            'email.unique'=>'User email is already existed',
            'email.email'=>'You should enter correct email',
            'password.required'=>'password is required, you have to fill it!',
            'password.min'=>'The password should be greater than 5 digits',
            'password.confirmed'=>'Password not confirmed',
            'avatar.required'=>'image is required',
            'avatar.mimes'=>'image should be jpeg , bmp of png',
           ] ;
    }
}
