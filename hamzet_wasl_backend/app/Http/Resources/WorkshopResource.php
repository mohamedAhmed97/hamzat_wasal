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
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'capcity' => $this->capcity,
            'category_id' => $this->category_id,
            'workshop_price' => $this->workshop_price,
            'meeting_link' => $this->meeting_link,
            'meeting_password' => $this->meeting_password,
            'meeting_backup_link' => $this->meeting_backup_link,
            'meeting_backup_password' => $this->meeting_backup_password,
            'mentor_info' => new MentorResource($this->user),
            'category_info' => new CategoryResource($this->categories)
        ];
    }
}
