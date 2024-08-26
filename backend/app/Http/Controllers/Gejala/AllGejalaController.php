<?php

namespace App\Http\Controllers\Gejala;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomResource;
use App\Models\Gejala;
use Illuminate\Http\Request;

class AllGejalaController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        
        $gejala = Gejala::select('id','kode','name')->get();
        if (!$gejala) {
            return response()->json('data tidak ditemukan', 404);
        };
        //return collection of data as a resource
        return new CustomResource(true, 'List Data Gejala', $gejala);
    }
}
