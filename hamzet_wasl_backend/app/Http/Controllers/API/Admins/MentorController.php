<?php

namespace App\Http\Controllers\API\Admins;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use App\Http\Requests\MentorRequest;
use App\Http\Resources\MentorResource;
use Illuminate\Support\Facades\Storage;
/* use App\Mail\UsersMails;
use Illuminate\Support\Facades\Mail; */
use App\Jobs\SendUsersMails;

use Hash;
class MentorController extends Controller
{
    
    //create Mentor
    public function store(MentorRequest $request)
    {
        $pic_name=time().$request->file('avatar')->getClientOriginalName();
        
        $path = $request->file('avatar')->storeAs(
            'public/Mentors/',$pic_name
        );
        $admin=User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
            'avatar'=>$pic_name,
            'isAdmin'=>1,
            'binding'=>1,
        ]);
        if(!$admin)
        {   
            return response()->json(
                [
                    "status"=>404,
                    "Error"=>"Sorry,You can't create a new Mentor as you have to fill all the required fields"],404
            );
           
        }
        else
        {   
            $admin->assignRole('mentor');
            dispatch(new SendUsersMails($request->email ,$admin->isAdmin))->delay(now()->addMinutes(10));

            return response()->json(
                [
                 "status" => 200,   
                "Success" => 'Mentor is added successfully ^_^ ',
                "Data:"=> new MentorResource($admin)],200
            );
        }
    }
    //delete Mentor
    public function destroy($mentor)
    {
        $mentor=User::find($mentor);
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
       $mentor=User::findOrFail($mentor);
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
                'isAdmin'=>1,
           ]);
       }
    }

    //index
    public function index()
    {
       return MentorResource::collection(User::where('isAdmin',1)->get());

    }

    //biniding Mentor

    public function bindingMentor()
    {
        $bindingMentors=User::where('binding',1)->get();
        return response()->json([
            "mentor"=>($bindingMentors)
        ]);
    }

    public function approvalMentor($id)
    {
        $mentor=User::find($id)->update([
            'binding'=>0,
        ]);
        if($mentor)
        {
            return response()->json(["status"=>200]);
        }
        else
        {
            return response()->json(["status"=>404]);   
        }
        
    }
}
