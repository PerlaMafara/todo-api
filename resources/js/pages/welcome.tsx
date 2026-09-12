import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type Task = {
    id: number;
    title: string;
    description: string | null;
    completed: boolean | number;
};

export default function Welcome() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [tareaAEliminar, setTareaAEliminar] = useState<number | null>(null);

    const cargarTareas = async () => {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        setTasks(data);
    };

    useEffect(() => {
        cargarTareas();
    }, []);

    const crearTarea = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            setError('El título es obligatorio');
            return;
        }

        setError('');

        await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
            }),
        });

        setTitle('');
        setDescription('');

        cargarTareas();
    };

    const cambiarEstado = async (id: number, completed: boolean) => {
        await fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                completed,
            }),
        });

        cargarTareas();
    };

    const eliminarTarea = async (id: number) => {
        await fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
        });

        setTareaAEliminar(null);
        cargarTareas();
    };

    const tareasPendientes = tasks.filter(
        (task) => !Boolean(task.completed)
    ).length;

    return (
        <>
            <Head title="To-Do List" />

            <main className="min-h-screen bg-gray-100 p-8">
                <div className="mx-auto max-w-3xl">
                    <h1 className="mb-2 text-4xl font-bold">
                        To-Do List
                    </h1>

                    <p className="mb-2 text-gray-600">
                        Organiza tus tareas de forma sencilla.
                    </p>

                    <p className="mb-8 text-sm text-gray-500">
                        {tasks.length === 0
                            ? 'No tienes tareas registradas.'
                            : `${tareasPendientes} tarea${
                                  tareasPendientes !== 1 ? 's' : ''
                              } pendiente${
                                  tareasPendientes !== 1 ? 's' : ''
                              }`}
                    </p>

                    <form
                        onSubmit={crearTarea}
                        className="mb-8 rounded-lg bg-white p-6 shadow"
                    >
                        <h2 className="mb-4 text-xl font-semibold">
                            Nueva tarea
                        </h2>

                        <input
                            type="text"
                            placeholder="Título"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setError('');
                            }}
                            className="mb-1 w-full rounded border p-2"
                        />

                        {error && (
                            <p className="mb-3 text-sm text-red-600">
                                {error}
                            </p>
                        )}

                        <textarea
                            placeholder="Descripción"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            className="mb-3 w-full rounded border p-2"
                            rows={3}
                        />

                        <button
                            type="submit"
                            className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                        >
                            Agregar tarea
                        </button>
                    </form>

                    <section className="space-y-4">
                        {tasks.length === 0 ? (
                            <div className="rounded-lg bg-white p-8 text-center shadow">
                                <p className="text-gray-500">
                                    Aún no tienes tareas.
                                </p>

                                <p className="mt-1 text-sm text-gray-400">
                                    Agrega una tarea usando el formulario
                                    anterior.
                                </p>
                            </div>
                        ) : (
                            tasks.map((task) => (
                                <article
                                    key={task.id}
                                    className={`rounded-lg bg-white p-5 shadow ${
                                        Boolean(task.completed)
                                            ? 'opacity-70'
                                            : ''
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="mr-4">
                                            <h2
                                                className={`text-lg font-semibold ${
                                                    Boolean(task.completed)
                                                        ? 'text-gray-400 line-through'
                                                        : ''
                                                }`}
                                            >
                                                {task.title}
                                            </h2>

                                            {task.description && (
                                                <p className="text-gray-600">
                                                    {task.description}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <label className="flex items-center gap-2 text-sm">
                                                <input
                                                    type="checkbox"
                                                    checked={Boolean(
                                                        task.completed
                                                    )}
                                                    onChange={(e) =>
                                                        cambiarEstado(
                                                            task.id,
                                                            e.target.checked
                                                        )
                                                    }
                                                />

                                                Completada
                                            </label>

                                            {tareaAEliminar === task.id ? (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-gray-600">
                                                        ¿Eliminar?
                                                    </span>

                                                    <button
                                                        onClick={() =>
                                                            eliminarTarea(
                                                                task.id
                                                            )
                                                        }
                                                        className="rounded bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                                                    >
                                                        Sí
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            setTareaAEliminar(
                                                                null
                                                            )
                                                        }
                                                        className="rounded border px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                                                    >
                                                        No
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        setTareaAEliminar(
                                                            task.id
                                                        )
                                                    }
                                                    className="rounded bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                                                >
                                                    Eliminar
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            ))
                        )}
                    </section>
                </div>
            </main>
        </>
    );
}