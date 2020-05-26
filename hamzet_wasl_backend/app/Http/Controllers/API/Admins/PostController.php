<?php

namespace App\Http\Controllers\API\Admins;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Post; 
use App\Http\Resources\PostResource;
use App\Http\Requests\PostRequest;


class PostController extends Controller
{
    public function index(){
        $posts=Post::all();
        $postresource=PostResource::collection($posts);
        return $postresource;
        
    }
    public function show(){
        $post = Post::find(request()->post);
        
        if(is_null($post)){
            return response()->json(["Error"=>"No such a post with this id"],404);
        }
        return new PostResource($post);
    }
    public function store(PostRequest $request){
        $post = Post::create($request->all());
        if($post)
        {
            return response()->json([
                "Success" => 'The post was added',
                "Data:"=> new PostResource($post),],200);
        }
        if(!$post){
            return response()->json(["Error"=>"Post was not added due to an error"],404);
        }
    }
    public function destroy(){
        $post = Post::find(request()->post);
        if(is_null($post)){
            return response()->json(["Error"=>"Post is not recorded"],404);
        }
        $post->delete();
        return response()->json(["Success"=>"Post deleted successfully"],200);
    }
    
    
    public function update(PostRequest $request, $postId){ 
        $post = Post::find($postId);
        if(is_null($post)){
            return response()->json(["Error"=>"Record doesn't found in the datatabase!! Enter a valid id ^_^"],404);
        }
        $post->update($request->all()); 
        return response()->json(["Success"=>"Post is Updated",
                                    "New data:"=> new PostResource($post)],200);
    }

}
