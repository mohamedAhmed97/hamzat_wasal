<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//categories
Route::group(['prefix' => 'categories'], function(){
    Route::get('/', 'API\Admins\CategoryController@index');
    Route::get('/{category}', 'API\Admins\CategoryController@show');
    Route::post('/', 'API\Admins\CategoryController@store');
    Route::delete('/{category}', 'API\Admins\CategoryController@destroy');
    Route::put('/{category}', 'API\Admins\CategoryController@update');
});

//Mentor
Route::group(['prefix' => 'mentors'], function () {
    Route::post('/', 'API\Admins\MentorController@store');
    //destroy
    Route::delete('/{mentor}', 'API\Admins\MentorController@destroy');
    //update
    Route::put('/{mentor}', 'API\Admins\MentorController@update');
    //index
    Route::get('/', 'API\Admins\MentorController@index');
});

//workshops
Route::group(['prefix' => 'workshops'], function(){
    Route::get('/', 'API\Mentors\WorkshopController@index');
    Route::get('/{workshop}', 'API\Mentors\WorkshopController@show');
    Route::post('/', 'API\Mentors\WorkshopController@store');
    Route::delete('/{workshop}', 'API\Mentors\WorkshopController@destroy');
    Route::put('/{workshop}', 'API\Mentors\WorkshopController@update');
});

//User
Route::group(['prefix' => 'users'], function () {
    Route::post('/', 'API\Admins\UserController@store');
    //destroy
    Route::delete('/{user}', 'API\Admins\UserController@destroy');
    //update
    Route::put('/{user}', 'API\Admins\UserController@update');
    //index
    Route::get('/', 'API\Admins\UserController@index');
});