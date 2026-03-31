<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;


class ServiceController extends Controller
{
     // Display a listing of the resource.
    public function index()
    {
        $services = Service::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status'=>200,
            'data'=>$services,
            'message'=>'Service List Fetched Successfully',
        ]);
    }

    // Store a newly created resource in storage.

    public function store(Request $request)
    {
      $validator = Validator::make($request->all(), [
        'title' => 'required',
        'slug' => 'required|unique:services,slug',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
         ]);

        if ($validator->fails()) {
        return response()->json([
            'errors' => $validator->messages(),
        ], 422);
        }


         $model = new Service();
         $model->title = $request->input('title');
         $model->slug = Str::slug($request->input('slug'));
         $model->short_description = $request->input('short_description');
        $model->content = $request->input('content');
        $model->status = $request->input('status');

        $model->save();

      // Image Upload
         if ($request->hasFile('image') && $request->file('image')->isValid()) {

            $image = $request->file('image');

            $filename = time() . '_' . $model->id . '.' . $image->getClientOriginalExtension();

            $destination = public_path('uploads/services');

            // create folder if not exists
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
            'status'=>200,
            'message'=>'Service Added Successfully',
           ]);
    }


    // Display the specified resource.

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

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        //
    }


     // Update the specified resource in storage.
  public function update(Request $request, $id)
    {
       $service = Service::find($id);
 
       if (!$service) {
        return response()->json([
            'status' => 404,
            'message' => 'Service Not Found',
        ]);
        }

        $validator = Validator::make($request->all(), [
        'title' => 'required',
        'slug' => 'required|unique:services,slug,' . $id,
        'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($validator->fails()) {
        return response()->json([
            'status' => 400,
            'errors' => $validator->messages(),
        ]);
         }

        $service->title = $request->input('title');
        $service->slug = Str::slug($request->input('slug'));
        $service->short_description = $request->input('short_description');
        $service->content = $request->input('content');
        $service->status = $request->input('status');

           // Update Image
           if ($request->hasFile('image') && $request->file('image')->isValid()) {

            // delete old image
            if ($service->image) {
                File::delete(public_path('uploads/services/' . $service->image));
            }

            $image = $request->file('image');

            $filename = time() . '_' . $service->id . '.' . $image->getClientOriginalExtension();

            $destination = public_path('uploads/services');

            if (!File::exists($destination)) {
                File::makeDirectory($destination, 0755, true);
            }

            $manager = ImageManager::usingDriver(Driver::class);

            $img = $manager->decode($image->getPathname());
            $img->scaleDown(1200);
            $img->save($destination . '/' . $filename);

            $service->image = $filename;
        }

         $service->save();

          return response()->json([
        'status' => 200,
        'message' => 'Service Updated Successfully',
         ]);
 }

     // Remove the specified resource from storage.

    public function destroy($id)
    {
        $service = Service::find($id);
         
         if(!$service){
            return response()->json([
                'status'=>404,
                'message'=>'Service Not Found',
            ]);
         }

         $service->delete();

         return response()->json([
            'status'=>200,
            'message'=>'Service Deleted Successfully',
        ]);
    }
}
