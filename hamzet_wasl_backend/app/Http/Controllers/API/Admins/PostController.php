<?php

namespace App\Http\Controllers\API\Admins;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Post; 
use App\Http\Resources\PostResource;
use App\Http\Requests\PostRequest;
use App\Media;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Storage;
use App\Jobs\SendUsersMails;

class PostController extends Controller
{   
    public function __construct()
    {
        //$this->middleware(['role:user']);
    }
    public function index(){
        $posts=Post::where('approval',1)->get();
        $postresource=PostResource::collection($posts);
        return $postresource;
        
    }
    public function show(){
        $post = Post::find(request()->post);
        $media=Media::where(request()->post);
        
        if(is_null($post)){
            return response()->json(["Error"=>"No such a post with this id"],404);
        }
        return new PostResource($post , $media);
    }
    public function store(request $request){

        $post = Post::create([
            'title'=>$request->title ,
            'user_id'=>$request->user_id ,
            'category_id'=>$request->category_id,
            'description'=>$request->description
        ]);
        
       

        $files = $request->file('photos');
       
        
        if($files)
        {   
            
             
              foreach ($files as $file) {
                
                $pic_name=time().$file->getClientOriginalName();
                
                $path = $file->storeAs(
                        'Media/Posts',$pic_name
                     );
                $media = Media::create([
                    'file'=>$path ,
                    'post_id'=>$post->id
                ]);
                }
             
        }     
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
        $medias = Media::where('post_id' , request()->post);
        $post = Post::find(request()->post);
        
        if(is_null($post)){
            return response()->json(["Error"=>"Post is not recorded"],404);
        } 
        foreach($medias as $media){
        Storage::delete('Media/Posts'.$media);
        }
        
        $medias->delete();
        $post->delete();
        return response()->json(["Success"=>"Post deleted successfully"],200);
    }
    
    
    public function update(PostRequest $request, $postId){ 
        $post = Post::find($postId);
        $mediaFiles= $post->media;
        if(is_null($post)){
            return response()->json(["Error"=>"Record doesn't found in the datatabase!! Enter a valid id ^_^"],404);
        }
       
        
        $post->update([
            'title'=>$request->title ,
            'user_id'=>$request->user_id ,
            'category_id'=>$request->category_id,
        ]);
        $files = $request->file('photos');
        
       
        
        if($files)
        {   
            $medias = Media::where('post_id' , request()->post)->delete();
            foreach($mediaFiles as $media){
                Storage::delete('Media/Posts'.$media);
            }
             
              foreach ($files as $file) {
                  
                
                $pic_name=time().$file->getClientOriginalName();
                
                $path = $file->storeAs(
                        'Media/Posts',$pic_name
                     );
                $media = Media::create([
                    'file'=>$path ,
                    'post_id'=>$post->id
                ]);
                }
             
        }     
        return response()->json(["Success"=>"Post is Updated",
                                    "New data:"=> new PostResource($post)],200);
    }

    //Approve
    public function approval($post)
    {
        $post=Post::find($post);
        $post->update([
            'approval'=>1,
        ]);
        dispatch(new SendUsersMails("mail@mail.com" ,3))->delay(now()->addMinutes(3));
        return response()->json(["status"=>200]);
    }

    //waiting
    public function waiting()
    {
        $posts=Post::where('approval',0)->get();
        return response()->json([
            "status"=>200,
            "data"=>PostResource::collection($posts)
        ]);
    }

}
