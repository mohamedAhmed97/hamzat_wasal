<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\User;
use Illuminate\Support\Facades\Hash;

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
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

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

//Post
Route::group(['prefix' => 'posts'], function () {
    Route::post('/', 'API\Admins\PostController@store');
    Route::get('/{post}', 'API\Admins\PostController@show');
    Route::delete('/{post}', 'API\Admins\PostController@destroy');
    Route::put('/{post}', 'API\Admins\PostController@update');
    Route::get('/', 'API\Admins\PostController@index');
});


//registe
Route::post('/register','API\Users\RegisterController@store');
Route::post('/login', function (Request $request) {
    $data = $request->validate([
        'email' => 'required|email',
        'password' => 'required'
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response([
            'message' => ['These credentials do not match our records.']
        ], 404);
    }

    // $token = $user->createToken('my-app-token')->plainTextToken;

    $response = [
        'user' => $user,
        // 'token' => $token
    ];

    return response($response, 201);
});


