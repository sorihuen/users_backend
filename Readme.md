# API Backend de Usuarios

Este es un backend desarrollado con Node.js, Express y MongoDB que proporciona un API RESTful para la gestión de usuarios.

## Características

- Conexión a MongoDB Atlas
- Modelo de Usuario con campos:
  - nombre (String, requerido)
  - email (String, único y requerido)
  - edad (Número, opcional)
  - fecha_creacion (Fecha, valor por defecto: fecha actual)
  - direcciones (Array de objetos)
- Operaciones CRUD completas para usuarios
- Manejo de errores
- Gestión de variables de entorno con dotenv

## Requisitos previos

- Node.js (versión 14 o superior)
- npm
- Cuenta en MongoDB Atlas

## Instalación

1. Clonar el repositorio:
   ```
   git clone https://github.com/sorihuen/users_backend.git
   cd backend_Users
   ```

2. Instalar dependencias:
   ```
   npm install
   ```

3. Configurar variables de entorno:
   - Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
     ```
    MONGODB_URI=mongodb+srv://sanyelibermudez:FE1UJymTKkztvoyc@prueba.zrr7i.mongodb.net/prueba_backend?retryWrites=true&w=majority&appName=prueba

     ```
## Estructura del proyecto

```
backend_Users/
├── .vscode/                # Configuración de VS Code
├── node_modules/           # Dependencias instaladas
├── Users/                  # Directorio principal de usuarios
│   ├── Middleware/         # Middlewares personalizados
│   │   ├── validation.js   # Middleware para hubs
│   ├── Model/              # Modelos de datos
│   │   └── users.js        # Modelo de Usuario
│   └── Routes/             # Rutas de la API
│       └── index.js        # Archivo principal de rutas
├── .env                    # Variables de entorno
├── .gitattributes          # Configuración de atributos de Git
├── .gitignore              # Archivos y carpetas ignorados por Git
├── app.js                  # Punto de entrada de la aplicación
├── package-lock.json       # Versiones específicas de dependencias
├── package.json            # Dependencias y scripts
└── README.md               # Documentación del proyecto
```

## Ejecución

Para iniciar el servidor en modo desarrollo:
```
npm run dev
```

## Endpoints API

### Usuarios

- **GET /api/users** - Obtener todos los usuarios
- **GET /api/user/:id** - Obtener un usuario por ID
- **POST /api/user** - Crear un nuevo usuario
- **PUT /api/user/:id** - Actualizar un usuario existente
- **DELETE /api/user/:id** - Eliminar un usuario
- **GET /api/user/search?city** -Buscar usuarios en una ciudad especifica

## Ejemplo de uso

### Crear un nuevo usuario

```bash
curl -X POST \
  http://localhost:3000/api/usuarios \
  -H 'Content-Type: application/json' \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "edad": 30,
    "direcciones": [
      {
        "calle": "Av. Principal",
        "ciudad": "Lima",
        "pais": "Perú",
        "codigo_postal": "15001"
      }
    ]
  }'
```

## Contribuciones

Las contribuciones son bienvenidas. Por favor, crea un fork del repositorio y envía un pull request con tus cambios.

## Licencia

[MIT](LICENSE)