# 📚 BookHub API

BookHub API es una aplicación REST creada con **Express** y **MongoDB Atlas**, que permite gestionar usuarios, libros, reseñas y favoritos. Incluye relaciones entre colecciones, semilla inicial y prevención de duplicados.

---

## 🚀 Instalación

1. Clona el repositorio:

git clone https://github.com/TU_USUARIO/bookhub-api.git

2. Instala dependencias:
   npm install

3. Crea el archivo `.env`:

PORT=3000
MONGO_URI=mongodb+srv://paupalaciosgordillo:<tu-contraseña>@bookhub.xalprje.mongodb.net/bookhub?retryWrites=true&w=majority&appName=BookHub

> Sustituye `<tu-contraseña>` por la contraseña real del usuario de MongoDB.

4. Inicia el proyecto:

npm run dev

---

## 🌱 Semilla (usuarios + libros + relaciones)

Para poblar la base de datos con datos de ejemplo:

npm run seed

Esto creará:

- 2 usuarios
- 2 libros
- Reseñas conectadas a usuarios
- Favoritos añadidos correctamente

---

## 📂 Estructura del proyecto

bookhub-api/
├── controllers/ // Lógica de cada endpoint
├── models/ // Esquemas de Mongoose
├── routes/ // Definición de rutas
├── seed/ // Semilla de datos
├── server.js // Inicio del servidor
├── .env // Variables de entorno
└── README.md // Documentación

---

## 🔗 Relación entre colecciones

- `User.favoriteBooks` → Array de referencias a libros
- `Book.reviews` → Array con `{ user, content }` conectados a `User`
- Al actualizar datos, los arrays relacionados **no se sobrescriben**
- Se evita duplicar favoritos mediante validación lógica

---

## 🧪 Endpoints de la API

### 📌 Usuarios

| Método | Ruta                              | Descripción                |
| ------ | --------------------------------- | -------------------------- |
| GET    | `/api/users`                      | Obtener todos los usuarios |
| POST   | `/api/users`                      | Crear nuevo usuario        |
| PUT    | `/api/users/:id`                  | Actualizar un usuario      |
| DELETE | `/api/users/:id`                  | Eliminar un usuario        |
| PUT    | `/api/users/:id/favorite/:bookId` | Añadir libro a favoritos   |

#### Body ejemplo para POST usuario:

{
"name": "Pau",
"email": "pau@example.com"
}

---

### 📚 Libros

| Método | Ruta                        | Descripción                  |
| ------ | --------------------------- | ---------------------------- |
| GET    | `/api/books`                | Obtener todos los libros     |
| POST   | `/api/books`                | Crear nuevo libro            |
| PUT    | `/api/books/:id`            | Actualizar un libro          |
| DELETE | `/api/books/:id`            | Eliminar un libro            |
| POST   | `/api/books/:bookId/review` | Añadir una reseña a un libro |

#### Body ejemplo para POST libro:

{ "title": "1984", "author": "George Orwell", "genre": "Distopía" }

#### Body ejemplo para reseña:

{ "userId": "ID_DEL_USUARIO", "content": "Una obra impactante" }

---

## 🔐 Validaciones y manejo de errores

- Todos los controladores usan `try/catch`
- Respuestas claras para errores (500, 404, 400)
- Verificación de duplicados en favoritos
- Control de existencia antes de actualizar/eliminar

---

## 📌 Requisitos del proyecto cumplidos

✅ Express como servidor  
✅ MongoDB Atlas con IP pública  
✅ `.env` incluido  
✅ Dos modelos (`User`, `Book`)  
✅ Relación entre colecciones con referencias  
✅ Semilla de datos real y enlazada  
✅ CRUD completo  
✅ Validación de duplicados  
✅ Documentación detallada en `README.md`

---

## 👤 Autor

**Pau Palacios Gordillo**  
📧 paupalaciosgordillo@gmail.com  
🔗 [GitHub](https://github.com/paupalacios7599)
