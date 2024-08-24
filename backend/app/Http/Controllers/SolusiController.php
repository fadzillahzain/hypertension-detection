<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomResource;
use App\Models\Solusi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SolusiController extends Controller
{
    /**
     * index
     *
     * @return void
     */
    
    public function index()
    {
        //get all data
        $data = DB::table('solusis')
            // ->get();
            ->orderBy('id','desc')
            ->get();
        
        //return collection of data as a resource
        return new CustomResource(true, 'List Data Solusi', $data);
    }

     /**
     * show
     *
     * @param  mixed $id
     * @return void
     */
    public function show($id)
    {
        //find data by ID
        $data = Solusi::find($id);
        if (!$data) {
            return response()->json('data tidak ditemukan', 404);
        };
        //return single data as a resource
        return new CustomResource(true, 'Detail Data!', $data);
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
            'penyakit_id'     => 'required',
            'name'     => 'required',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //create data
        $data = Solusi::create([
            'penyakit_id'     => $request->penyakit_id,
            'name'     => $request->name,
        ]);

        //return response
        return new CustomResource(true, 'Data Berhasil Ditambahkan!', $data);
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
            'name'   => 'required'
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //find data by ID
        $data = Solusi::find($id);

        if (!$data) {
            return response()->json('data tidak ditemukan', 404);
        };
        
        $data->update([
            'name'   => $request->name
        ]);

        //return response
        return new CustomResource(true, 'Data Berhasil Diubah!', $data);
    }
    
    /**
     * destroy
     *
     * @param  mixed $id
     * @return void
     */
    public function destroy($id)
    {

        //find data by ID
        $data = Solusi::find($id);
        if (!$data) {
            return response()->json('data tidak ditemukan', 404);
        };
        //delete data
        $data->delete();

        //return response
        return new CustomResource(true, 'Data Berhasil Dihapus!', null);
    }
}
