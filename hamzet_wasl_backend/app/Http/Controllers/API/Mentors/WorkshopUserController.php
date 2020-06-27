<?php


namespace App\Http\Controllers\API\Mentors;

use App\Http\Controllers\Controller;

use App\Http\Resources\WorkshopUserResource;
use App\User;
use App\Workshop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Mail\AcceptWorkshop;
use Illuminate\Support\Facades\Mail;
class WorkshopUserController extends Controller
{
    public function index($id){
        $users = DB::table('user_workshop')->join('users' , 'users.id' , 'user_workshop.user_id')->where('user_workshop.workshop_id',$id)->get();
        return response()->json([
            "status"=>200,
            "users"=>($users)
        ]);
    }


    public function store(request $request){
        DB::table('user_workshop')->insert(
            ['workshop_id' => $request->workshop_id , 'user_id' => $request->user_id]
        );

        return response()->json(["status"=>200]);
    }

    public function update($id){
        DB::table('user_workshop')->where('uw_id',$id)->update(['status'=>'Accepted']);
        // dd($x);
        $workshop_user=DB::table('user_workshop')->where('uw_id',$id)->first();
        $user=User::where('id',$workshop_user->user_id)->first();     
        $workshop=Workshop::where('id',$workshop_user->workshop_id)->first();
        if($user)
        {
            Mail::to($user->email)->send(new AcceptWorkshop($workshop));
        }
        return response()->json(["status"=>200]);
    }

    public function destroy($id){
        $record=DB::table('user_workshop')->where('uw_id',$id)->delete();
        
        return response()->json(["status"=>200]);
    }


}
