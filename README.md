# Trabajo Final Viajes

En un entorno individual y aislado, surge la necesidad de proporcionar a los apasionados de los viajes un espacio en línea donde puedan compartir y descubrir experiencias únicas de viaje, para eso creamos esta pagina.

## Índice


- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)




## Características

- Lista de características clave del proyecto.
- Registro y Autenticación:

Los usuarios pueden registrarse y autenticarse de manera segura.
Utilización de tokens JWT para gestionar la autenticación.
Gestión de Contenido:

Creación, edición y eliminación de posteos por parte de usuarios autorizados.
Comentarios en posteos con capacidad de edición y eliminación.

Restricciones de Acceso:
Las acciones de creación, edición y eliminación están restringidas a usuarios autorizados.
Diferentes roles de usuario con permisos específicos.
Modelo de Datos:


Ruta pública para visualizar posteos.
Diseño atractivo y legible de posteos y comentarios.

Tecnologías Backend:
Uso de Node.js, Express, MongoDB y Mongoose de manera correcta.
Integración sin problemas entre el backend y el frontend.
Middlewares:

Implementación y configuración correcta de middlewares, como el middleware de autenticación.
Estilo y Diseño:

Diseño atractivo y amigable para el usuario.
Mantener una consistencia estilística en toda la aplicación.

## Algunas de las Tecnologías Utilizadas

- [Tecnología 1](https://es.react.dev/)
- [Tecnología 2](https://tailwindcss.com/)
- [Tecnología 3](https://nodejs.org/en)
- [Tecnología 4](https://www.mongodb.com/try/download/compass)
- [Tecnología 5](https://www.postman.com/)


## Instalación

1. Clona el repositorio o puede descargarla: `git clone https://github.com/Nahuuui/Comision-2-Esteban-Jonathan-Nahuel.git`
2. Navega al directorio raiz del proyecto, o si ya esta en la ruta raiz siga el sig paso: `cd node`
3. Instala las dependencias: `npm install`

## Configuración

Crea un archivo `.env` en el directorio raíz y completa con tus variables de entorno:

1)
```env
PORT= valor1 
MONGO_URI = "mongodb://127.0.0.1:27017/valor2" // o  "mongodb://localhost:27017/valor2"
JWT_SECRET = "Valor3"

2)

dirijase hacia la carpeta react (donde esta el frontEnd) y vaya a la carpeta /src/utils/
y dentro de la carpeta creas un archivo llamado "consts.js" y dentro del archivo crearas una variable
con el nombre "API_URL" en donde el valor que pegaremos ahi sera la URL nuestro servidor backend
por ejemplo si mi backend corre en el PORT: 3100: --> export const API_URL = "http://localhost:3100".
Segun lo que hayamos definido en el PORT de nuestro archivo .env ira allí el puerto.


# Uso

1) inicie el backend desde la carpeta raiz node: npm run dev
2) inicie el frontend desde la carpeta raiz frontReact: npm run dev


