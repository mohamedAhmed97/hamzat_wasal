<?php

namespace App\Http\Controllers\API\Mentors;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Workshop;
use App\Http\Resources\WorkshopResource;
use App\Http\Requests\WorkshopRequest;

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
    public function store(WorkshopRequest $request){
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
    
    //delete a workshop from the database (workshops table)
    public function destroy(){
        $workshop = Workshop::find(request()->workshop);
        if(is_null($workshop)){
            return response()->json(["Error"=>"Record doesn't found in the datatabase!! Enter a valid id ^_^"],404);
        }
        $workshop->delete();
        return response()->json(["Success"=>"You deleted this workshop successfully, This record isn't a part of the database anymore"],200);
    }

    //update a workshop in the database (workshops table)
    public function update(WorkshopRequest $request, $workshopId){ 
        $workshop = Workshop::find($workshopId);
        if(is_null($workshop)){
            return response()->json(["Error"=>"Record doesn't found in the datatabase!! Enter a valid id ^_^"],404);
        }
        $workshop->update($request->all()); 
        return response()->json(["Success"=>"workshop Updated successfully",
                                    "New data:"=> new WorkshopResource($workshop)],200);
    }
    
}
