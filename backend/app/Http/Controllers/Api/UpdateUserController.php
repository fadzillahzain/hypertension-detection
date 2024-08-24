<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomResource;
use App\Models\User;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UpdateUserController extends Controller
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
            'name'          => 'required',
            'email'         => 'required|email',
            'no_hp'         => 'required',
            'jenis_kelamin' => 'required',
            'tempat_lahir'  => 'required',
            'tanggal_lahir' => 'required',
            'alamat'        => 'required',
        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $request->user()->update([
            'name'          => $request->name,
            'email'         => $request->email,
            'tanggal_lahir' => new DateTime($request->tanggal_lahir),
            'tempat_lahir'  => $request->tempat_lahir,
            'alamat'        => $request->alamat,
            'no_hp'         => $request->no_hp,
            'jenis_kelamin' => $request->jenis_kelamin,
         ]);
         //return response
         return new CustomResource(true, 'Data Berhasil Diubah!', $request->user());
    }
}
