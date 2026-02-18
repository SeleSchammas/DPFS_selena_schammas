# DPFS_selena_schammas

👜 Brontë Bags

Proyecto Final – Programación Web Full Stack

Digital House

⸻

📌 Descripción del Proyecto

Brontë Bags es un e-commerce desarrollado como proyecto integrador de la carrera Full Stack Developer en Digital House.

La aplicación permite gestionar productos y usuarios desde el backend y visualizar métricas del negocio a través de un dashboard desarrollado en React.

El proyecto integra:
	•	Backend con API REST
	•	Base de datos MySQL
	•	Sequelize como ORM
	•	Arquitectura MVC
	•	Dashboard administrativo en React
	•	Integración completa entre frontend y backend

⸻

🚀 Tecnologías utilizadas

🔹 Backend
	•	Node.js
	•	Express
	•	MySQL
	•	Sequelize
	•	Arquitectura MVC
	•	Middlewares
	•	Sessions y Cookies
	•	Validaciones
	•	API REST en formato JSON

🔹 Frontend (Dashboard)
	•	React
	•	Fetch API
	•	Componentes reutilizables
	•	Consumo de endpoints reales


📦 Estructura del Proyecto

/ (raíz)
 ├── src/              → Backend (rutas, controladores, lógica)
 ├── models/           → Modelos Sequelize
 ├── migrations/       → Migraciones de base de datos
 ├── seeders/          → Datos iniciales
 ├── config/           → Configuración de la base de datos
 ├── public/           → Archivos estáticos
 ├── dashboard/        → Frontend React (consume la API)
 ├── app.js            → Punto de entrada del servidor
 └── package.json

🔌 API REST

Endpoints de Usuarios
	•	GET /api/users
	•	GET /api/users/:id

Incluye:
	•	Listado completo
	•	Detalle individual
	•	Respuestas estructuradas en JSON

⸻

Endpoints de Productos
	•	GET /api/products
	•	GET /api/products/:id

Incluye:
	•	Listado completo
	•	Detalle individual
	•	Conteo por categorías
	•	Paginación
	•	Respuestas estructuradas en JSON

⸻

📊 Dashboard en React

El dashboard consume la API y muestra:
	•	Total de productos
	•	Total de usuarios
	•	Total de categorías
	•	Último producto creado
	•	Listado dinámico de productos

Todos los datos se obtienen en tiempo real desde la base de datos.

⚙️ Cómo ejecutar el proyecto

1️⃣ Clonar el repositorio

git clone https://github.com/SeleSchammas/DPFS_selena_schammas.git

2️⃣ Instalar dependencias (backend)

npm install

3️⃣ Configurar base de datos MySQL
Crear la base de datos y ejecutar:

npx sequelize db:migrate
npx sequelize db:seed:all

4️⃣ Ejecutar servidor

npm start

Servidor disponible en:

http://localhost:3000

5️⃣ Ejecutar Dashboard (React)

Desde la carpeta /dashboard:

npm install
npm start

Disponible en:

http://localhost:3001
(o puerto indicado por React)

📊 Metodología Ágil

El proyecto fue desarrollado bajo metodología ágil utilizando tablero Trello para la gestión de tareas por sprint.

⸻

👩‍💻 Autora

Maria Selena Schammas
Estudiante Full Stack Developer
Digital House

⸻

✅ Estado del Proyecto

Proyecto finalizado y completamente funcional.
Integración backend + frontend realizada correctamente.
Listo para evaluación.
