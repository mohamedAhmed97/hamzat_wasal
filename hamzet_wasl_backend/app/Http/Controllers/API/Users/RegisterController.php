<?php

namespace App\Http\Controllers\API\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Hash;
use Illuminate\Support\Facades\Storage;

class RegisterController extends Controller
{
    
public function store(Request $request)
{
    $user_avatar_name= time().$request->file('avatar')->getClientOriginalName();
    $path = $request->file('avatar')->storeAs(
         'public/user',$user_avatar_name);

    $user= User::create([
         'name'=>$request->name,
         'email'=>$request->email,
         'password'=>Hash::make($request->password),   
         'avatar'=>$user_avatar_name,
     ]);
     
     if($user)
        {
            return response()->json([
                "Success" => 'User is added successfully ^_^ ',
                ],200);
        }
        if(!$user){
            return response()->json(["Error"=>"Sorry,You can't create a new user as you have to fill all the required fields"],404);
        }
     }
}


