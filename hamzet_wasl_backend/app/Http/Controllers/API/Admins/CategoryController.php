<?php

namespace App\Http\Controllers\API\Admins;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Category;
use App\Http\Resources\CategoryResource;

class CategoryController extends Controller
{
    //get all the categories in the database (categories table)
    public function index(){
        return CategoryResource::collection(Category::all()); 
    }

    //get one category in the database (categories table)
    public function show(){
        $category = Category::find(request()->category);
        //check if the category doesn't exist in the database
        if(is_null($category)){
            return response()->json(["Error"=>"Record doesn't found in the datatabase!! Enter a valid id ^_^"],404);
        }
        return new CategoryResource($category);
    }

    //add a new category to the database (categories table)
    public function store(Request $request){
        $category = Category::create($request->all());
        if($category)
        {
            return response()->json([
                "Success" => 'category is added successfully ^_^ ',
                "Data:"=> new CategoryResource($category),],200);
        }
        if(!$category){
            return response()->json(["Error"=>"Sorry,You can't create a new category as you have to fill all the required fields"],404);
        }
    }   
}