<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WorkshopResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        return[
            'title' => $this->title,
            'description' => $this->description,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'capcity' => $this->capcity,
            'category_id' => $this->category_id,
            'workshop_price' => $this->workshop_price,
            'mentor_info' => new MentorResource($this->admins),
            'category_info' => new CategoryResource($this->categories)
        ];
    }
}
