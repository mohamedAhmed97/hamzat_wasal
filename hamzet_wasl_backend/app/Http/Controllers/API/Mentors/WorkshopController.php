<?php

namespace App\Http\Controllers\API\Mentors;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Workshop;
use App\Http\Resources\WorkshopResource;

class WorkshopController extends Controller
{
    //get all the workshops in the database (workshops table)
    public function index(){
        return WorkshopResource::collection(Workshop::all()); 
    }

    //get one workshop in the database (workshops table)
    public function show(){
        $workshop = Workshop::find(request()->workshop);
        //check if the workshop doesn't exist in the database
        if(is_null($workshop)){
            return response()->json(["Error"=>"Record doesn't found in the datatabase!! Enter a valid id ^_^"],404);
        }
        return new WorkshopResource($workshop);
    }

    //add a new workshop to the database (workshops table)
    public function store(Request $request){
        $workshop = workshop::create($request->all());
        if($workshop)
        {
            return response()->json([
                "Success" => 'workshop is added successfully ^_^ ',
                "Data:"=> new WorkshopResource($workshop),],200);
        }
        if(!$workshop){
            return response()->json(["Error"=>"Sorry,You can't create a new workshop as you have to fill all the required fields"],404);
        }
    }  
}
