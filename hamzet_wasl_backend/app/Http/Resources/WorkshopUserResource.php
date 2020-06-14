<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WorkshopUserResource extends JsonResource
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
            'workshop_id' => $this->workshop_id,
            'user_id' => $this->user_id,    
            'status' => $this->status, 
            'userinfo'=> new UserResource($this->user_id),
            // 'workshopinfo'=>new WorkshopResource(($this->workshop_id))
        ];
    }
}
