<?php

namespace App\Http\Controllers;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{

public function index()
{
    $mostrarTareas = Task::all();

    return response()->json($mostrarTareas);
}

public function store(Request $request)
{
    $request->validate([
    'title' => 'required|string'
    ]);

    $nuevaTarea = Task::create([
        'title' => $request->input('title'),
        'description' => $request->input('description'),
    ]);

    return response()->json($nuevaTarea);
}

public function update(Request $request, $id)
{
    $request->validate([
        'completed' => 'boolean'
    ]);

    $actualizarTarea = Task::find($id);

    $actualizarTarea->update([
        'completed' => $request->input('completed')
    ]);

    return response()->json($actualizarTarea);
}

public function destroy($id)
{
    $eliminarTarea = Task::find($id);

    $eliminarTarea->delete();

    return response()->json([
        'message' => 'Tarea eliminada correctamente'
    ]);
}
}
