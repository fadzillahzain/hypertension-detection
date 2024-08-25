<?php

namespace App\Http\Controllers\Penyakit;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomResource;
use App\Models\Gejala;
use App\Models\Penyakit;
use Illuminate\Http\Request;

class AllPenyakitController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
    
        $penyakit = Penyakit::select('id','name')->get();
        if (!$penyakit) {
            return response()->json('data tidak ditemukan', 404);
        };
        
        $gejala = Gejala::select('id','name')->get();
        if (!$gejala) {
            return response()->json('data tidak ditemukan', 404);
        };
        $data = ["penyakit" => $penyakit, "gejala" => $gejala];
        //return collection of data as a resource
        return new CustomResource(true, 'List Data Penyakit dan Gejala', $data);

    }
}
