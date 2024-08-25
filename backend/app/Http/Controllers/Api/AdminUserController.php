<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomResource;
use App\Models\User;
use Illuminate\Http\Request;

class AdminUserController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $user = User::select('*')
            ->where('role','=', '1945')
            ->get();
        if (!$user) {
            return response()->json('data tidak ditemukan', 404);
        };
        
        //return collection of data as a resource
        return new CustomResource(true, 'List Data Admin', $user);
    }
}
