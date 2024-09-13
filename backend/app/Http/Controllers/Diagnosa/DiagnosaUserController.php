<?php

namespace App\Http\Controllers\Diagnosa;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomResource;
use App\Models\Aturan;
use App\Models\Penyakit;
use App\Models\RekamMedis;
use App\Models\Gejala;
use App\Models\User;
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
            ->where('user_id', '=', $request->user()->id)
            ->get();

        if (!$data) {
            return response()->json('data tidak ditemukan', 404);
        }

        for ($i = 0; $i < count($data); $i++) {
            $data[$i]['user'] = User::find($data[$i]['user_id']);
        }

        //return collection of data as a resource
        return new CustomResource(true, 'List Data Gejala', $data);
    }

    // NOTE: [hypertension, no_hypertension, uncertainity]

    protected function combineBPAs($bpa1, $bpa2)
    {
        $combined = [];
        $K = ($bpa1[0] * $bpa2[1]) + ($bpa1[1] * $bpa2[0]);

        $combined[0] = ($bpa1[0] * $bpa2[0]
            + $bpa1[0] * $bpa2[2]
            + $bpa1[2] * $bpa2[0]) / (1 - $K);

        $combined[1] = ($bpa1[1] * $bpa2[1]
            + $bpa1[1] * $bpa2[2]
            + $bpa1[2] * $bpa2[1]) / (1 - $K);

        $combined[2] = ($bpa1[2] * $bpa2[2]) / (1 - $K);

        return $combined;
    }

    private function stringToArray($string)
    {
        // string: [1,2,3]
        // remove [ ]
        $string = substr($string, 1, -1);

        $array = explode(',', $string);
        $array = array_map('floatval', $array);

        return $array;
    }

    private function getBPA($gejala_id, $penyakit_id)
    {
        $aturan = Aturan::where('gejala_id', '=', $gejala_id, 'and', 'penyakit_id', '=', $penyakit_id)->first();
        if ($aturan) {
            return $this->stringToArray($aturan->nilai_dst);
        } else {
            return [0, 0, 1];
        }
    }

    public function diagnosa(Request $request)
    {
        $gejala_req = $request->gejala; // array of gejala id
        $penyakit_req = $request->penyakit; // penyakit id

        // ============================ CF ===========================
        $combinedCF = 0;
        foreach ($gejala_req as $gejala) {
            $cf = 0;
            $aturan = Aturan::where('gejala_id', '=', $gejala, 'and', 'penyakit_id', '=', $penyakit_req)->first();

            if ($aturan) {
                $cf = $aturan->nilai;
            }

            $combinedCF += $cf * (1 - abs($combinedCF));
        }

        // ============================ DST ===========================
        $combinedBPA = $this->getBPA($gejala_req[0], $penyakit_req);

        for ($i = 1; $i < count($gejala_req); $i++) {
            $combinedBPA = $this->combineBPAs(bpa1: $combinedBPA, bpa2: $this->getBPA($gejala_req[$i], $penyakit_req));
        }

        $belief = $combinedBPA[0];
        $plausibility = 1 - $combinedBPA[1];

        return new CustomResource(true, 'Data Berhasil Ditambahkan!', [
            'combinedCF' => $combinedCF,
            'combinedBPA' => $combinedBPA,
            'belief' => $belief,
            'plausibility' => $plausibility
        ]);
    }
}
