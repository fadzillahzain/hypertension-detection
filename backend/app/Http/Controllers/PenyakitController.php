<?php

namespace App\Http\Controllers;

//import model Post
use App\Models\Penyakit;

use App\Http\Controllers\Controller;

//import resource CustomResource
use App\Http\Resources\CustomResource;
use App\Models\Solusi;
//import the DB support
use Illuminate\Support\Facades\DB;

//import Http request
use Illuminate\Http\Request;

//import facade Validator
use Illuminate\Support\Facades\Validator;

class PenyakitController extends Controller
{
    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        //get all data
        $penyakit = DB::table('penyakits')
            // ->get();
            ->orderBy('id','desc')
            ->paginate(5);
        
        //return collection of data as a resource
        return new CustomResource(true, 'List Data Penyakit', $penyakit);
    }

    
    /**
     * show
     *
     * @param  mixed $id
     * @return void
     */
    public function show($id)
    {
        //find penyakit by ID
        $penyakit = Penyakit::find($id);
        if (!$penyakit) {
            return response()->json('data tidak ditemukan', 404);
        };
        //return single penyakit as a resource
        return new CustomResource(true, 'Detail Data!', $penyakit);
    }

    
     /**
     * store
     *
     * @param  mixed $request
     * @return void
     */

    public function store(Request $request)
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'kode'     => 'required',
            'name'     => 'required',
            'deskripsi'   => 'required',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        
        // $serializedArr = serialize($request->solusi);
        // $serializedArr = 

        //create penyakit
        $penyakit = Penyakit::create([
            'kode'     => $request->kode,
            'name'     => $request->name,
            'solusi'    => $request->solusi,
            'deskripsi'   => $request->deskripsi,
        ]);

        //return response
        return new CustomResource(true, 'Data Berhasil Ditambahkan!', $penyakit);
    }

    
    /**
     * update
     *
     * @param  mixed $request
     * @param  mixed $id
     * @return void
     */
    public function update(Request $request, $id)
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'kode'     => 'required',
            'name'   => 'required',
            'deskripsi'   => 'required',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //find penyakit by ID
        $penyakit = Penyakit::find($id);
        if (!$penyakit) {
            return response()->json('data tidak ditemukan', 404);
        };
        $penyakit->update([
            'code'      => $request->code,
            'name'      => $request->name,
            'deskripsi' => $request->deskripsi,
            'solusi'    =>$request->solusi
        ]);

        //return response
        return new CustomResource(true, 'Data Berhasil Diubah!', $penyakit);
    }
    
    /**
     * destroy
     *
     * @param  mixed $id
     * @return void
     */
    public function destroy($id)
    {

        //find penyakit by ID
        $penyakit = Penyakit::find($id);
        if (!$penyakit) {
            return response()->json('data tidak ditemukan', 404);
        };
        //find solusi dengan penyakit_id tsb lalu delete
        // Solusi::where('penyakit_id',$id)->delete();

        //delete penyakit
        $penyakit->delete();

        //return response
        return new CustomResource(true, 'Data Berhasil Dihapus!', null);
    }
}
