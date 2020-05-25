<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WorkshopRequest extends FormRequest
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
            'title' => 'required|min:3|unique:workshops,title,'.$this->workshop,
            'description' => 'required|min:10',
            'start_date' => 'required|date_format:Y-m-d H:i|after:today  ',
            'end_date' => 'required|date_format:Y-m-d H:i|after:today',
            'capcity' => 'required|numeric',
            'workshop_price' => 'required|numeric', 
            'admin_id' => 'required|exists:admins,id|numeric',
            'category_id' => 'required|exists:categories,id|numeric',
        ];
    }

    public function messages()
    {
        return [
            'title.unique' => 'Workshop title is unique, you have to choose a different title!',
            'start_date.date_format' => 'The start date does not match the format Y-m-d H:i     EX: 2020-05-25 09:30',
            'end_date.date_format' => 'The end date does not match the format Y-m-d H:i       EX: 2020-05-25 11:30',
        ] ;
    }
}
