<?php

namespace App\Http\Controllers\API\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Hash;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\RegisterRequest;
use App\Jobs\SendUsersMails;

class RegisterController extends Controller
{
    public function store(RegisterRequest $request)
    {
        $user_avatar_name = time() . $request->file('avatar')->getClientOriginalName();
        $path = $request->file('avatar')->storeAs(
            'public/user',
            $user_avatar_name
        );

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'avatar' => $user_avatar_name,
            'isAdmin' => 0,
        ]);

        if ($user) {
            $user->assignRole('user');
           
            if($user->hasVerifiedEmail())
            {
                dispatch(new SendUsersMails($request->email, $user->isAdmin))->delay(now()->addMinutes(3));
            }
            return response()->json([
                "Success" => 'User is added successfully ^_^ ',
                "status" => 200,
                "user" => $user,
            ], 200);
        }
        if (!$user) {
            return response()->json(["Error" => "Sorry,You can't create a new user as you have to fill all the required fields"], 404);
        }
    }
}
