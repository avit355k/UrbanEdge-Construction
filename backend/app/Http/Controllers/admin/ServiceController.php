<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;

use App\Models\Service;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Service::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status'=>200,
            'data'=>$services,
            'message'=>'Service List Fetched Successfully',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      $validator = Validator::make($request->all(),[
       'title'=>'required',
       'slug' => 'required|unique:services,slug',
      ]);

      if($validator->fails()){
        return response()->json([
            'status'=>400,
            'errors'=>$validator->messages(),
        ]);
      }

      $model = new Service();
        $model->title = $request->input('title');
        $model->slug = Str::slug($request->input('slug'));
        $model->short_desc = $request->input('short_desc');
        $model->content = $request->input('content');
        $model->status = $request->input('status');
        $model->save();

        if($request->imageId > 0){

            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null){
               $extArray = explode('.', $tempImage->name);
               $ext = end($extArray);

               $filename = strtotime('now').$model->id.'.'.$ext;

               //create small thumbnail
                $sourcePath = public_path('uploads/temp/'.$tempImage->name);
                $destPath = public_path('uploads/temp/Small/'.$filename);
                $manager = ImageManager::usingDriver(Driver::class);
                $image = $manager->decode($sourcePath);
                $image->coverDown(500, 600);
                $image->save($destPath);

                //create large thumbnail
                $destPath = public_path('uploads/temp/Large/'.$filename);
                $manager = ImageManager::usingDriver(Driver::class);
                $image = $manager->decode($sourcePath);
                $image->scaleDown(1200);
                $image->save($destPath);

                $model->image = $filename;
                $model->save();

            }
        }

        return response()->json([
            'status'=>200,
            'message'=>'Service Added Successfully',
        ]);
    }

    /**
     * Display the specified resource.
     */
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

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {   
         $service = Service::find($id);
         
         if(!$service){
            return response()->json([
                'status'=>404,
                'message'=>'Service Not Found',
            ]);
         }

         $validator = Validator::make($request->all(),[
         'title'=>'required',
         'slug' => 'required|unique:services,slug,'.$id.',id',
      ]);

      if($validator->fails()){
        return response()->json([
            'status'=>400,
            'errors'=>$validator->messages(),
        ]);
      }

    
        $service->title = $request->input('title');
        $service->slug = Str::slug($request->input('slug'));
        $service->short_desc = $request->input('short_desc');
        $service->content = $request->input('content');
        $service->status = $request->input('status');
        $service->save();

        //update temp images to service images
        if($request->imageId > 0){
            $oldImage = $service->image;

            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null){
               $extArray = explode('.', $tempImage->name);
               $ext = end($extArray);

               $filename = strtotime('now').$service->id.'.'.$ext;

               //create small thumbnail
                $sourcePath = public_path('uploads/temp/'.$tempImage->name);
                $destPath = public_path('uploads/temp/Small/'.$filename);
                $manager = ImageManager::usingDriver(Driver::class);
                $image = $manager->decode($sourcePath);
                $image->coverDown(500, 600);
                $image->save($destPath);

                //create large thumbnail
                $destPath = public_path('uploads/temp/Large/'.$filename);
                $manager = ImageManager::usingDriver(Driver::class);
                $image = $manager->decode($sourcePath);
                $image->scaleDown(1200);
                $image->save($destPath);

                $service->image = $filename;
                $service->save();

                if($oldImage != null){
                    File::delete(public_path('uploads/temp/Small/'.$oldImage));
                    File::delete(public_path('uploads/temp/Large/'.$oldImage));
                }
            }
        }

        return response()->json([
            'status'=>200,
            'message'=>'Service Updated Successfully',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
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
