<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Post;
use App\Workshop;
use App\Http\Resources\WorkshopResource;
use App\Http\Resources\PostResource;
class ProfileController extends Controller
{
    public function getPosts($user)
    {
        //posts
        $posts=Post::where('user_id',$user)->where('approval',1)->get();
        
        if($posts)
        {
            return response()->json([
                "status"=>200,
                 "posts"=>PostResource::collection($posts)
            ],200);
        }
        else{
            return response()->json([
                "status"=>404,
            ]);
        }
    }

    //workshops
    public function getWorkshops($user)
    {
       $workshops=Workshop::where('user_id',$user)->get();
       if($workshops)
       {
            return response()->json([
                "status"=>200,
                "WorkshopResource"=>WorkshopResource::collection($workshops),
            ]);
       }
       else{
            return response()->json([
                "status"=>404
            ]);
       }
    }
}
