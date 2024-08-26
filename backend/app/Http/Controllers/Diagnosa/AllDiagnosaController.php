<?php

namespace App\Http\Controllers\Diagnosa;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomResource;
use App\Models\RekamMedis;
use Illuminate\Http\Request;

class AllDiagnosaController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        
        $data = RekamMedis::select('id','kode','name')->get();
        if (!$data) {
            return response()->json('data tidak ditemukan', 404);
        };
        //return collection of data as a resource
        return new CustomResource(true, 'List Data Gejala', $data);
    }
}
