<?php

namespace App\Http\Controllers\Diagnosa;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomResource;
use App\Models\RekamMedis;
use Illuminate\Http\Request;

class DiagnosaUserController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        
        // return response()->json($request->user()->id);
        $data = RekamMedis::select('*')
            ->where('user_id','=',$request->user()->id)
            ->get();
        if (!$data) {
            return response()->json('data tidak ditemukan', 404);
        };
        //return collection of data as a resource
        return new CustomResource(true, 'List Data Gejala', $data);
    }
}
