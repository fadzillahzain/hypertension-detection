<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomResource;
use App\Models\User;
use Illuminate\Http\Request;

class MemberUserController extends Controller
{
    /**
     * Handle the incoming request.
     */
    
     public function __invoke(Request $request)
     {
         $penyakit = User::select('*')
             ->where('role','=', '2012')
             ->get();
         if (!$penyakit) {
             return response()->json('data tidak ditemukan', 404);
         };
         
         //return collection of data as a resource
         return new CustomResource(true, 'List Data Admin', $penyakit);
     }
}
