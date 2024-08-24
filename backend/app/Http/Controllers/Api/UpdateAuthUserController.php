<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomResource;
use App\Models\User;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UpdateAuthUserController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
    
        //set validation
        $validator = Validator::make($request->all(), [
            'password'      => 'required|min:8|confirmed',
        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $request->user()->update([
            'password'      => bcrypt($request->password),
         ]);
         //return response
         return new CustomResource(true, 'Data Berhasil Diubah!', $request->user());
    }
}
