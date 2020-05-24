<?php

namespace App\Http\Controllers\API\Admins;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Admin;
use App\Http\Requests\MentorRequest;
use App\Http\Resources\MentorResource;
use Illuminate\Support\Facades\Storage;
class MentorController extends Controller
{
    //create Mentor
    public function store(MentorRequest $request)
    {
        $pic_name=time().$request->file('avatar')->getClientOriginalName();
        
        $path = $request->file('avatar')->storeAs(
            'Users/Mentors/',$pic_name
        );
        $admin=Admin::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>$request->password,
            'avatar'=>$pic_name,
            'isAdmin'=>0,
        ]);
        if(!$admin)
        {
            return response()->json(
                ["Error"=>"Sorry,You can't create a new Mentor as you have to fill all the required fields"],404
            );
        }
        else
        {
            return response()->json(
                ["Success" => 'Mentor is added successfully ^_^ ',
                "Data:"=> $admin],200
            );
        }
    }
    //delete Mentor
    public function destroy($mentor)
    {
        $mentor=Admin::find($mentor);
        if($mentor)
        {
            Storage::delete('/Users/Mentors/'.$mentor->avatar);
            $mentor->delete();
            return response()->json(
                ["success"=>"Mentor Deleted"],200
            );
        }
        else
        {
            return response()->json(
                ["success"=>"Mentor Not Existed"],400
            );  
        }
    }
    //update
    public function update(Request $request,$mentor)
    {
       $mentor=Admin::findOrFail($mentor);
       if($mentor)
       {   //delete image
           Storage::delete('/Users/Mentors/'.$mentor->avatar);
           $pic_name=time().$request->file('avatar')->getClientOriginalName();
        
           $path = $request->file('avatar')->storeAs(
               'Users/Mentors/',$pic_name
           );
           $mentor->update([
                'name'=>$request->name,
                'email'=>$request->email,
                'password'=>$request->password,
                'avatar'=>$pic_name,
                'isAdmin'=>0,
           ]);
       }
    }

    //index
    public function index()
    {
       return MentorResource::collection(Admin::where('isAdmin',0)->get());

    }
}
