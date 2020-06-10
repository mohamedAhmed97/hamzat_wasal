<?php

namespace App\Http\Controllers;

use App\Http\Resources\WorkshopUserResource;
use App\Workshop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class workshopUserController extends Controller
{
    public function index(){
        $users = DB::table('workshop_user')->get(); 
        return view('Mentors.workshopUser.index' , ['users'=>$users]);
    }

    public function store($user_id , $workshop_id){
        DB::table('workshop_user')->insert(
            ['workshop_id' => $workshop_id , 'user_id' => $user_id]
        );
        return response()->json(["status"=>200]);
    }

    public function update($user_id , $workshop_id){
        DB::table('workshop_user')->where('workshop_id',$workshop_id)->where('user_id' , $user_id)->update(['status'=>false]);
        return response()->json(["status"=>200]);
    }

    public function destroy($user_id , $workshop_id){
        DB::table('workshop_user')->where('workshop_id',$workshop_id)->where('user_id' , $user_id)->delete();
        return response()->json(["status"=>200]);
    }


}
