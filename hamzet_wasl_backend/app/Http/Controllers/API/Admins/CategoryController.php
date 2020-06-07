<?php

namespace App\Http\Controllers\API\Admins;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Category;
use App\Http\Resources\CategoryResource;
use App\Http\Requests\CategoryRequest;

class CategoryController extends Controller
{
    /*  public function __construct()
    {
        $this->middleware(['role:admin','permission:show category']);
    } */
    //get all the categories in the database (categories table)
    public function index()
    {
        return CategoryResource::collection(Category::all());
    }

    //get one category in the database (categories table)
    public function show()
    {
        $category = Category::find(request()->category);
        //check if the category doesn't exist in the database
        if (is_null($category)) {
            return response()->json(["Error" => "Record doesn't found in the datatabase!! Enter a valid id ^_^"], 404);
        }
        return new CategoryResource($category);
    }

    //add a new category to the database (categories table)
    public function store(CategoryRequest $request)
    {
        $category = Category::create($request->all());
        if ($category) {
            return response()->json([
                "Success" => 'category is added successfully ^_^ ',
                "Data:" => new CategoryResource($category),
            ], 200);
        }
        if (!$category) {
            return response()->json(["Error" => "Sorry,You can't create a new category as you have to fill all the required fields"], 404);
        }
    }

    //delete a category from the database (categories table)
    public function destroy()
    {
        $category = category::find(request()->category);
        if (is_null($category)) {
            return response()->json(["Error" => "Record doesn't found in the datatabase!! Enter a valid id ^_^"], 404);
        }
        $category->delete();
        return response()->json(["Success" => "You deleted this category successfully, This record isn't a part of the database anymore"], 200);
    }

    //update a category in the database (categories table)
    public function update(CategoryRequest $request, $categoryId)
    {
        $category = category::find($categoryId);
        if (is_null($category)) {
            return response()->json(["Error" => "Record doesn't found in the datatabase!! Enter a valid id ^_^"], 404);
        }
        $category->update($request->all());
        return response()->json([
            "Success" => "category Updated successfully",
            "New data:" => new CategoryResource($category)
        ], 200);
    }
}
