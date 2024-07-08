# API de Tienda Online

Esta es una API RESTful desarrollada con Node.js y Sequelize para administrar los productos y usuarios de una tienda online. La API permite realizar operaciones CRUD en productos y usuarios, y utiliza JWT para la autenticación.


## Características

- Registro e inicio de sesión de usuarios.
- Operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para productos.
- Autenticación mediante JSON Web Tokens (JWT).

## Tecnologías Utilizadas

- Node.js
- Express.js
- Sequelize
- MySQL
- JSON Web Tokens (JWT)
- bcrypt.js

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto localmente.

1. Clona este repositorio:

   ```sh
   git clone https://github.com/MANUEL025/API_NODE.git
   cd API_NODE

2. Instala dependencias:
    npm install

3. Crea un archivo .env en la raíz del proyecto con el siguiente contenido:
   DB_NAME=proyecto
   DB_USER=tu_usuario
   DB_PASS=tu_contraseña
   DB_HOST=localhost
   DB_DIALECT=mysql
   JWT_SECRET=tu_jwt_secret

4. inicia el servidor:
   node server.js

5. La API estará disponible en http://localhost:3000


## Para realizar pruebas de la Api desde postman por ejemplo las rutas serian:

#  Rutas de la API
#  Autenticación
1. Registro de usuarios

URL: /auth/register

Método: POST

# Body: {

  "nombre": "Juan Perez",
  
  "email": "juan@example.com",
  
  "password": "123456",
  
  "direccion": "Calle Falsa 123",
  
  "rol": "user"
}


#############
2. Inicio de sesión

URL: /auth/login
Método: POST
# Body:
{
  "email": "juan@example.com",
  "password": "123456"
}

##########

# Usuarios
3. Obtener todos los usuarios

URL: /usuarios
# Método: GET
Headers:
{
  "x-auth-token": "<TOKEN_JWT>"
}
## Recuerda cambiar el "TOKEN_JWT" por el token generado en la autenticacion del usuario.

4. Actualizar usuario

URL: /usuarios/:id
Método: PUT
# Headers:
{
  "x-auth-token": "<TOKEN_JWT>"
}

# body:
{
  "nombre": "Nuevo Nombre",
  "email": "nuevoemail@example.com",
  "password": "nuevopassword",
  "direccion": "Nueva Direccion",
  "rol": "admin"
}

#  Productos
1. Obtener todos los productos

URL: /productos
Método: GET
# Headers:
{
  "x-auth-token": "<TOKEN_JWT>"
}

2. Crear producto

URL: /productos
Método: POST
# Headers:
{
  "x-auth-token": "<TOKEN_JWT>"
}

# body:
{
  "nombre": "Producto 1",
  "descripcion": "Descripción del producto 1",
  "precio": 100.00,
  "imagen": "imagen.jpg",
  "categoria_id": 1,
  "stock": 10
}

3. Actualizar producto

URL: /productos/:id
Método: PUT
# Headers:
{
  "x-auth-token": "<TOKEN_JWT>"
}
# Body:
{
  "nombre": "Nuevo Producto",
  "descripcion": "Nueva Descripción",
  "precio": 200.00,
  "imagen": "nuevaimagen.jpg",
  "categoria_id": 2,
  "stock": 50
}




## Contribución

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio
2. Crea una rama para tus cambios (`git checkout -b feature/nueva-feature`)
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva feature'`)
4. Sube tus cambios (`git push origin feature/nueva-feature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.







