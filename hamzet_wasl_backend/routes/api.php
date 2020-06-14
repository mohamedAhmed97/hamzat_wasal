<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\User;
use GuzzleHttp\Middleware;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

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
Route::group(['prefix' => 'categories', 'middleware' => ['auth:sanctum', 'role:admin']], function () {
    Route::get('/{category}', 'API\Admins\CategoryController@show');
    Route::post('/', 'API\Admins\CategoryController@store');
    Route::delete('/{category}', 'API\Admins\CategoryController@destroy');
    Route::put('/{category}', 'API\Admins\CategoryController@update');
});
Route::group(['prefix' => 'categories'], function () {
    Route::get('/', 'API\Admins\CategoryController@index');
});

Route::group(['prefix' => 'pagination'], function () {
    Route::get('/', 'API\Admins\CategoryController@pagination');
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
Route::group(['prefix' => 'workshops','middleware' =>['auth:sanctum', 'role:mentor']], function () {
    Route::get('/{workshop}', 'API\Mentors\WorkshopController@show');
    Route::post('/', 'API\Mentors\WorkshopController@store');
    Route::delete('/{workshop}', 'API\Mentors\WorkshopController@destroy');
    Route::put('/{workshop}', 'API\Mentors\WorkshopController@update');
});
Route::group(['prefix' => 'workshops'], function () {
    Route::get('/', 'API\Mentors\WorkshopController@index');
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
Route::group(['prefix' => 'posts','middleware' => ['auth:sanctum','role:admin']], function () {
    Route::get('/waiting','API\Admins\PostController@waiting');
    
});
//Post
Route::group(['prefix' => 'posts','middleware' => ['auth:sanctum','role:user']], function () {
    Route::post('/', 'API\Admins\PostController@store');
    
    Route::put('/{post}', 'API\Admins\PostController@update');
});

//Post
Route::group(['prefix' => 'posts'], function () {
    Route::get('/', 'API\Admins\PostController@index');
    
    Route::put('/approve/{post}', 'API\Admins\PostController@approval');
    Route::delete('/{post}', 'API\Admins\PostController@destroy');
    Route::get('/{post}', 'API\Admins\PostController@show');
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//registe
Route::post('/register', 'API\Users\RegisterController@store');
Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
        'device_name' => 'required'
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }
    //dd($user->hasRole('admin'));
    return $user->createToken($request->device_name)->plainTextToken;
});


// Join Workshop
Route::group(['prefix' => 'workshopUser','middleware' => ['auth:sanctum','role:user']], function () {
    
    Route::post('/', 'API\Mentors\WorkshopUserController@store');
});
// Mentor view workshop join requests
Route::group(['prefix' => 'workshopUser','middleware' => ['auth:sanctum','role:mentor']], function () {
    //destroy(reject joining)
    Route::delete('/{id}', 'API\Mentors\WorkshopUserController@destroy');
    //update (accept joining)
    // Route::put('/{id}', 'API\Mentors\WorkshopUserController@update');
    //index
    Route::get('/{workshop_id}', 'API\Mentors\WorkshopUserController@index');
});
Route::put('/approve/{id}' , 'API\Mentors\WorkshopUserController@update');