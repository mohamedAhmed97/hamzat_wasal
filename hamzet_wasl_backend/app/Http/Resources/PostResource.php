<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
          
            'title'=>$this->title,
            'description'=>$this->description,
            'category info'=> new CategoryResource($this->categories),
            'user info'=> new UserResource($this->users) ,
            'media' => MediaResource::collection($this->media)
                 
        ];
    }
}
