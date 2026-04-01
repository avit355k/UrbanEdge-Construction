<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    //all active services
    public function index(){
        $services = Service::where('status', 1)->orderBy('created_at', 'desc')->get();
        
        return response()->json([
            'status'=>200,
            'data'=>$services,
            'message'=>'Service List Fetched Successfully',
        ]);
    }

    //latest active service
    public function latest(){
        $services = Service::where('status', 1)
        ->orderBy('created_at', 'desc')
        ->take(4)
        ->get();
        
        return response()->json([
            'status'=>200,
            'data'=>$services,
            'message'=>'Service List Fetched Successfully',
        ]);
    }

    //show single service details
    public function show($id)
    {
        $service = Service::find($id);
         
         if(!$service){
            return response()->json([
                'status'=>404,
                'message'=>'Service Not Found',
            ]);
         }

         return response()->json([
            'status'=>200,
            'data'=>$service,
            'message'=>'Service Fetched Successfully',
        ]);
    }
}
