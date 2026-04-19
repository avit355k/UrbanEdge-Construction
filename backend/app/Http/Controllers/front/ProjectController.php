<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    //all active projects
    public function index()
    {
        $projects = Project::where('status', 1)->orderBy('created_at', 'desc')->get();
        return response()->json([
            'status'=>200,
            'data'=>$projects,
            'message'=>'Project List Fetched Successfully',
        ]);
    }

    //latest active projects
    public function latest()
    {
        $projects = Project::where('status', 1)
        ->orderBy('created_at', 'desc')
        ->take(4)
        ->get();
        
        return response()->json([
            'status'=>200,
            'data'=>$projects,
            'message'=>'Project List Fetched Successfully',
        ]);
    }

    //show single project details
    public function show($id)
    {
        $project = Project::find($id);
         
         if(!$project){
            return response()->json([
                'status'=>404,
                'message'=>'Project Not Found',
            ]);
         }

         return response()->json([
            'status'=>200,
            'data'=>$project,
            'message'=>'Project Fetched Successfully',
        ]);
    }
}
