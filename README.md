# Pokémon Pokedex

## Este proyecto es una aplicación para la gestión de entrenadores Pokémon, permitiendo realizar operaciones CRUD sobre entrenadores y consumo de API externa. 
## Utiliza Node.js y Express en el backend, MongoDB como base de datos, y React con Redux Toolkit en el frontend además de TailwindCSS para los styles.
## Cuenta con validación de data en frontend y backend.

## Tecnologías y dependencias utilizadas

- Backend: Node.js, Express, Mongoose
- Frontend: React, Redux Toolkit, React Router, TailwindCSS
- Base de Datos: MongoDB
- Otras: Typescript, Axios para llamadas HTTP, dotenv para manejo de variables de entorno

## Estructura del Proyecto

`/api: Archivos del servidor Express, modelos de Mongoose, y controladores.`

`/api/src/models: Modelos de Mongoose.`
`/api/src/routes: Rutas de Express.`
`/api/src/controllers: Lógica de negocio.`
`/api/src/config: Configuración de mongoose.`
`/api/src/types: Types para data`

`/app: Componentes de frontend y estilos.`

`/app/src/components: Componentes de React.`
`/app/src/redux: Configuración de Redux Toolkit y slices.`
`/api/src/types: Types para components`

## Instalación

Para instalar las dependencias del proyecto, sigue estos pasos:

- Clona el repositorio en tu máquina local.
- Navega al directorio del proyecto en tu terminal.
- Ejecuta `npm i` tanto en el directorio del frontend como en el del backend para instalar todas las dependencias necesarias.

## Configuración

Para configurar las variables de entorno necesarias para ambos, el frontend y el backend. 
Esto incluye la URL de conexión a MongoDB y la URL base de la API.

Para el backend, crea un archivo `.env` en el directorio `/api` con las siguientes variables:

```
PORT=3001
BASE_URL=https://pokeapi.co/api/v2/
MONGODB_URI=mongodb://localhost:27017/pokedex
```

Para el frontend, crea un archivo `.env` en el directorio `/app` con la siguiente variable:

```
VITE_API_URL=http://localhost:3001/api/
```

## Ejecución

Para ejecutar el proyecto, necesitarás iniciar tanto el servidor backend como la aplicación frontend.

Para iniciar el servidor backend, navega al directorio `/api` y ejecuta:

```
npm run start:dev
```

Para iniciar la aplicación frontend, navega al directorio `/app` y ejecuta:

```
npm run start:dev
```

Ahora, deberías poder acceder a la aplicación frontend desde `http://localhost:3000` y el servidor backend estará escuchando en `http://localhost:3001`.
