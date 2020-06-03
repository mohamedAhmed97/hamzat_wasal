<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'name'=>'required|min:3',
            'email'=> 'required|unique:users|email|regex:/(.+)@(.+)\.(.+)/i' ,
            'password'=>'required|min:6|confirmed',
            'avatar'=>'required',
        ];
    }

    public function messages()
    {
        return [
            'email.regex' => 'The email format is invalid, the format must be like EX: mayar@gmail.com',   
        ] ;
    }
}