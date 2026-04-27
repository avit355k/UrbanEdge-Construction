<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ProjectController extends Controller
{
    //Display all projects
    public function index()
    {
        $projects = Project::orderBy('created_at', 'DESC')->get();

        return response()->json([
            'status' => 200,
            'data' => $projects,
            'message' => 'Project List Fetched Successfully',
        ]);
    }
    //Store a new project
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:projects,slug',
            'image'=>'nullable|image|mimes:jpeg,png,jpg,webp,avif|max:5120',  
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
            ], 422);
        };

        $model = new Project();
        $model->title = $request->input('title');
        $model->slug = Str::slug($request->input('slug'));
        $model->short_description = $request->input('short_description');
        $model->content = $request->input('content');
        $model->construction_type = $request->input('construction_type');
        $model->sector = $request->input('sector');
        $model->location = $request->input('location');
        $model->status = $request->input('status');

        $model->save();

            // Image Upload
            if ($request->hasFile('image') && $request->file('image')->isValid()) {

                $image = $request->file('image');

                $filename = time() . '_' . $model->id . '.' . $image->getClientOriginalExtension();

                $destination = public_path('uploads/projects');

                // Create the destination directory if it doesn't exist
                if (!File::exists($destination)) {
                    File::makeDirectory($destination, 0755, true);
                }

                $manager = ImageManager::usingDriver(Driver::class);

                // decode image
                $img = $manager->decode($image->getPathname());

                // resize + compress
                $img->scaleDown(1200); // max width
                $img->save($destination . '/' . $filename);

                $model->image = $filename;
                $model->save();
            }

            return response()->json([
                'status' => 200,
                'message' => 'Project Added Successfully',
            ]);

    }

    //Show a specific project
    public function show($id)
    {
        // Code to fetch and return a specific project by ID
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'status' => 404,
                'message' => 'Project Not Found',
            ]);
        }

        return response()->json([
            'status' => 200,
            'data' => $project,
        ]);

    }

    //Update a specific project
    public function update(Request $request, $id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'status' => 404,
                'message' => 'Project Not Found',
            ]);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:projects,slug,' . $id,
            'image'=>'nullable|image|mimes:jpeg,png,jpg,webp,avif|max:5120',  
        ]);

        if($validator->fails()){
            return response()->json([
                'errors'=>$validator->messages(),
            ],422);
        };

        $project->title = $request->input('title');
        $project->slug = Str::slug($request->input('slug'));
        $project->short_description = $request->input('short_description');
        $project->content = $request->input('content');
        $project->construction_type = $request->input('construction_type');
        $project->sector = $request->input('sector');
        $project->location = $request->input('location');
        $project->status = $request->input('status', 1);

           //update image
          if ($request->hasFile('image') && $request->file('image')->isValid()) {

            // Delete old image safely
            if ($project->image && File::exists(public_path('uploads/projects/' . $project->image))) {
            File::delete(public_path('uploads/projects/' . $project->image));
          }

        $image = $request->file('image');

        $filename = time() . '_' . $project->id . '.' . $image->getClientOriginalExtension();

        $destination = public_path('uploads/projects');

        if (!File::exists($destination)) {
            File::makeDirectory($destination, 0755, true);
        }

        $manager = ImageManager::usingDriver(Driver::class);

        $img = $manager->decode($image->getPathname());
        $img->scaleDown(1200);
        $img->save($destination . '/' . $filename);

        $project->image = $filename;
       }

    

        $project->save();

        return response()->json([
            'status' => 200,
            'message' => 'Project Updated Successfully',
        ]);

    }

    //Delete a specific project
    public function destroy($id)
    {
        $project = Project::find($id);

        if(!$project){
            return response()->json([
                'status'=>404,
                'message'=>'Project Not Found',
            ]);
         }

         $project->delete();

          return response()->json([
          'status' => 200,
          'message' => 'Project Deleted Successfully',
           ]);
    }
}
