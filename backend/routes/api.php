<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/**
 * route "/register"
 * @method "POST"
 */

 Route::post('/register', App\Http\Controllers\Api\RegisterController::class)->name('register');

/**
 * route "/login"
 * @method "POST"
 */
Route::post('/login', App\Http\Controllers\Api\LoginController::class)->name('login');

/**
 * route "/user"
 * @method "GET"
 */
Route::middleware('auth:api')->group(function(){
    //edit user
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::put('/user', App\Http\Controllers\Api\UpdateUserController::class);
    Route::put('/user/pass', App\Http\Controllers\Api\UpdateAuthUserController::class);
    Route::get('/user/super', App\Http\Controllers\Api\AdminUserController::class);
    Route::get('/user/reg', App\Http\Controllers\Api\MemberUserController::class);

    Route::get('/penyakit/all', App\Http\Controllers\Penyakit\AllPenyakitController::class)->name('penyakitAll');
    Route::apiResource('/penyakit', App\Http\Controllers\PenyakitController::class);

    Route::apiResource('/solusi', App\Http\Controllers\SolusiController::class);
    Route::apiResource('/gejala', App\Http\Controllers\GejalaController::class);
    Route::apiResource('/aturan', App\Http\Controllers\AturanController::class);
    Route::apiResource('/rekam', App\Http\Controllers\RekamMedisController::class);
    
});

Route::delete('/logout', App\Http\Controllers\Api\LogoutController::class)->name('logout');

