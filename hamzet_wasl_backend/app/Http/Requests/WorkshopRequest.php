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
            'start_date' => 'required|date|after:today  ',
            'end_date' => 'required|date|after:today',
            'capcity' => 'required|numeric',
            'workshop_price' => 'required|numeric', 
            'user_id' => 'required|exists:users,id|numeric',
            'category_id' => 'required|exists:categories,id|numeric',
            'meeting_link' => 'required|url',
            'meeting_password' => 'nullable|string',
            'meeting_backup_link' => 'nullable|url',
            'meeting_backup_password' =>'nullable|string',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Workshop name field is required',
            'title.min' => 'Workshop name must be at least 3 characters',
            'title.unique' => 'Workshop name is unique, you have to choose a different title!',
            'description.required' => 'Description field is required',
            'description.min' => 'Description must be at least 10 characters', 
            'start_date.required' => 'Start date field is required',
            'start_date.after' => 'Start date must be a date after today',
            'end_date.required' => 'End date field is required',
            'end_date.after' => 'End date must be a date after today',
            'capcity.required' => 'Number of attendees field is required',
            'capcity.numeric' => 'Number of attendees must be a number',
            'workshop_price.required' => 'Price field is required',
            'workshop_price.numeric' => 'Price must be a number',
            'meeting_link.required' => 'Meeting URL is required',
            'meeting_link.url' => 'Meeting URL format is invalid',
            'meeting_backup_link.url' => 'Meeting Backup URL format is invalid',
        ] ;
    }
}
