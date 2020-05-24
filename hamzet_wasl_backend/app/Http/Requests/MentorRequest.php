<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MentorRequest extends FormRequest
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
            'password' => 'required|min:8|confirmed',
            'avatar' => 'required|mimes:jpeg,bmp,png',
        ];
    }

    //message
    public function messages()
    {
        return [
            'name.min' => 'Mentor name has minimum of 3 chars',
            'name.required' => 'Mentor name is required, you have to fill it!',
            'name.unique' => 'Mentor name is unique, you have to choose a different title!',
            'email.required'=>'Mentor name is required, you have to fill it!',
            'email.unique'=>'Mentor email is already existed',
            'email.email'=>'You should enter correct email',
            'password.required'=>'password is required, you have to fill it!',
            'password.min'=>'The password should be greater than 7 digite',
            'password.confirmed'=>'Password not confirmed',
            'avatar.required'=>'image is required',
            'avatar.mimes'=>'image should be jpeg , bmp of png',
           ] ;
    }
}
