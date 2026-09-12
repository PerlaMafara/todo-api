Instalación
1. Clonar el repositorio: git clone https://github.com/PerlaMafara/todo-api.git y después ejecutar cd todo-api.
2. Instalar dependencias: composer install y npm install.
3. Configurar el entorno: cp .env.example .env y php artisan key:generate.
4. Crear la base de datos SQLite: touch database/database.sqlite y después ejecutar php artisan migrate.
5. Ejecutar el proyecto: en una terminal ejecutar php artisan serve y en otra npm run dev.
6. Abrir en el navegador: http://127.0.0.1:8000

Funcionalidades
-Crear tareas.
-Consultar tareas.
-Marcar y desmarcar tareas como completadas.
-Eliminar tareas con confirmación.
-Validar que el título no esté vacío.

API
-GET /api/tasks — Listar tareas.
-POST /api/tasks — Crear tarea.
-PUT /api/tasks/{id} — Actualizar estado.
-DELETE /api/tasks/{id} — Eliminar tarea.

Decisiones técnicas
-Laravel para la API REST y la lógica del backend.
-SQLite como base de datos por su configuración sencilla.
-React y TypeScript para la interfaz.
-fetch para la comunicación entre frontend y API.
-useState y useEffect para manejar el estado y cargar las tareas.
