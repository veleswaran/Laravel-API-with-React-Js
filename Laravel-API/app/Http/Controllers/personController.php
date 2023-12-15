<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\person;
use Illuminate\Support\Facades\Validator;

class personController extends Controller
{
    public $person;
    public function __construct(){
        $this->person = new person();
    }
    public function index()
    {
        return $this->person->all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'images' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', 
            'name' => 'required',
            'phone' => 'required',
            'email' => 'required|email',
        ]);
    
        $image = $request->file('images');
        $filename = time() . "." . $image->getClientOriginalExtension();
        $image->move('storage/images/', $filename);

        person::create([
            'image' => $filename,
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email, 
        ]);
    
        return "Image uploaded successfully";
    }    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return $person = $this->person->find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updatePerson(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
            'phone' => 'required',
            'email' => 'required|email',
            'images'=>'required',
        ]);

        $image = $request->file('images');
        $filename = time() . "." . $image->getClientOriginalExtension();
        $image->move('storage/images/', $filename);

        $person = person::find($id);
        $person ->name = $request->name;
        $person ->phone = $request->phone;
        $person ->email = $request->email;
        $person ->image = $filename;
        $person->save();
    
        return "Image uploaded successfully";
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $person = $this->person->find($id);
        return $person->delete(); 
    }
}
