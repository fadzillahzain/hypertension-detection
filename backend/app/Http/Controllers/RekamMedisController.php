<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomResource;
use App\Models\RekamMedis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class RekamMedisController extends Controller
{
    /**
     * index
     *
     * @return void
     */
    
    public function index()
    {
        //get all data
        $data = DB::table('rekam_medis')
            ->leftJoin('users','rekam_medis.user_id','=','users.id')
            ->leftJoin('rekam_gejalas','rekam_gejalas.rekamMedis_id','=','rekam_medis.id')
            ->leftJoin('gejalas','rekam_gejalas.gejala_id','=','gejalas.id')
            ->leftJoin('rekam_penyakits','rekam_penyakits.rekamMedis_id','=','rekam_medis.id')
            ->leftJoin('penyakits','rekam_penyakits.penyakit_id','=','penyakits.id')
            ->select('rekam_medis.*','users.name as pengguna', 'gejalas.name as gejala','penyakits.name as penyakit')
            ->orderBy('rekam_medis.id','desc')
            ->get();    
        
        //return collection of data as a resource
        return new CustomResource(true, 'List Data ', $data);
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
        $data = RekamMedis::find($id);
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
            'user_id'     => 'required',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //create data
        $data = RekamMedis::create([
            'user_id'     => $request->user_id
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
            'user_id'   => 'required'
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //find data by ID
        $data = RekamMedis::find($id);

        if (!$data) {
            return response()->json('data tidak ditemukan', 404);
        };
        
        $data->update([
            'user_id'   => $request->user_id
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
        $data = RekamMedis::find($id);
        if (!$data) {
            return response()->json('data tidak ditemukan', 404);
        };
        //delete data
        $data->delete();

        //return response
        return new CustomResource(true, 'Data Berhasil Dihapus!', null);
    }
}
