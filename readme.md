

 #  <center> :european_castle: Proyecto Backend Mongo DB :european_castle: </center> 

 ## :clipboard: Índice :clipboard:

 - [Sobre el proyecto](#bookmarktabs-sobre-el-proyecto-bookmarktabs)

    - [Instalación y despliegue](#nutandbolt-instalación-y-despliegue)

    - [Tecnologías utilizadas](#wrench-tecnologiaspackages-utilizados)

    - [Origen](#dart-origen)

    - [Objetivos](#pushpin-objetivos)

    - [Inspiración](#cinema-inspiración)

- [Documentacion de API](#books-documentacion-de-api-books)

    - [Validaciones](#ballotboxwithcheck-validaciones-hechas-en-el-proyecto-ballotboxwithcheck)

    - [Función admin](#bowtie-función-del-administrador-bowtie)

    - [Endpoints](#11-endpoints)

      - [Usuarios](#registrarse)

      - [Posts](#crear)

      - [Comentarios](#crear-comentario)


- [Retos presentados](#dart-retos-presentados-dart)

    - [Borrar en cascada](#borrar-en-cascada)

    - [Manejo de relación de documentos](#manejo-de-relación-de-documentos)
    
    - [Validaciones](#validaciones)

    - [Uso de heroku](#uso-de-heroku)

    - [Nodemailer](#uso-de-nodemailer)

    - [Swagger](#uso-de-swagger)


- [Agradecimientos](#agradecimientos)

- [Futuras implementaciones](#blacknib-futuras-implementaciones-blacknib)

- [Autor](#raisedhands-autor-raisedhands)

# :bookmark_tabs: Sobre el proyecto :bookmark_tabs:


## :nut_and_bolt: Instalación y despliegue 
Para el desarrollo de esta API se ha utilizado MongoDB junto con su ODM Mongoose mediante express en NodeJS.
El proyecto se subirá a un repositorio público de GitHub.
Para instalar este proyecto debes hacer lo siguiente: primero acceder desde github al repositorio y proceder a clonártelo con el siguiente comando:

git clone https://github.com/vaneebg/BACKEND_MONGODB_RED_SOCIAL

Una vez clonado el respositorio es muy importante que en tu consola instales todos los npm que necesita el proyecto con el siguiente comando: 
````
npm i
````

Seguidamente, hay que crear un archivo .env que lleve lo siguiente:
```

PORT = el puerto que utilizarás

MONGO_URI = tu link para conectar con la base de datos MongoBD

JWT_SECRET = tu secreto

USER = el correo que utilizarás para enviar email con nodemailer
PASS = tu contraseña del correo

```

Por último, procede a levantar el servidor con este comando:
```
npm start
```

## :wrench: Tecnologias/packages utilizados 
- Javascript
- MongoDB
- Node
- Express
- Mongoose
- Nodemailer
- Bcrypt
- Jsonwebtoken
- Multer
- Postman

## :dart: Origen 
Es un proyecto de backend de la academia The Brigde para asentar conocimientos en todo el terreno de base de datos no relacionales con MongoDB conjuntamente con Node+Express y el ODM que utilizaremos: Mongoose. Ha consistido en desarrollar la base de datos de una red social conjuntamente con sus funcionalidades: tener seguidores, dar likes a posts o comentarios, etc.


Además de la utilización de estas tecnologías, se ha trabajado en diversas ramas de Git para continuar con el proceso de aprendizaje de esta herramienta y fomentar las buenas prácticas. Primeramente se ha creado la rama develop y, como en este caso ha sido un trabajo invididual, se ha trabajado desde esa misma rama.   Finalmente, cuando se prueba el proyecto entero desde develop, se comprueba que todo funciona y. si es el caso, se acaba añadiendo a la rama main.


Para organizar el trabajo, se ha hecho uso de Trello para dividir las tareas y tener un planteamiento más tangible de las diferentes fases del proyecto:
![foto](/uploadsreadme/Sin%20trello.png)

 
## :pushpin: Objetivos 
Una vez analizadas las necesidades del proyecto, se espera
que el alumno desarrolle una API REST que sea capaz de lo siguiente:


- [X] Registro de usuarios usando Bcrypt.


- [X] Login de usuarios + token + middleware.


- [X] Que sea capaz de crear un CRUD.


- [X] Dar/quitar Like a post.


- [X] Backend disponible en producción (Heroku).

**Requisitos imprescindibles del proyecto:


- [X]  Uso de ramas con git, cuando se termine el proyecto deberán quedar dos ramas la master o main y la develop.


- [X]  Presentación de README excelente.

## 1.1. Endpoints

  **_Posts_**


- [X] Endpoint para crear un post( tiene que estar autenticado)


- [X] Endpoint para actualizar un post ( tiene que estar autenticado)


- [X] Endpoint para eliminar un post( tiene que estar autenticado)


- [X] Endpoint para traer todos los posts junto a los usuarios que hicieron ese post y junto a los comentarios del post


- [X] Endpoint para buscar post por nombre


- [X] Endpoint para buscar post por id


- [X] Implementa validación a la hora de crear un post para que se rellene todos los campos(salvo la imagen, que no sea requerida) y si no se hace que devuelva un mensaje


- [X] Paginación de 10 en 10


  - *Likes:*


- [X] Endpoint para dar un like a un post


- [X] Endpoint para quitar like a un post

- [X]  Comments


Endpoint para crear un comentario en un determinado post



  **_Usuarios_**


- [X] Endpoint para registrar un usuario utilizando bcrypt


- [X] Implementa el correo de confirmación para el registro


- [X] Endpoint para login(utilizando bcrypt +JWT)


- [X] Validación en el login:


Si no has confirmado tu correo no puedes conectarte


- [X] Endpoint que nos traiga la información del usuario conectado


- [X] Endpoint para el logout


- [X] Implementa validación a la hora de crear un usuario para que se rellene todos los campos y si no se hace que devuelva un mensaje


- [X] Backend disponible en producción (Heroku).


- [X] Middleware para comprobar la autoría del post a la hora de editar/eliminar el mismo.




## 1.2. Extras


- [X] Middleware para comprobar la autoría del comentario a la hora de editar/eliminar el mismo.


- [X] Implementa el middleware multer para poder adjuntar imágenes al crear o actualizar posts.


- [X] Implementa el middleware multer para poder adjuntar imágenes al crear o actualizar comentarios.


- [X] Implementa el middleware multer para poder adjuntar imágenes al crear o actualizar un usuario.


- [X] Implementación de followers:


Que puedas seguir a otros usuarios

Que puedas dejar de seguir a otros usuarios


- [X] El Endpoint que nos trae la información del usuario conectado, además que nos traiga los posts y el número de seguidores que tiene


- [X] Endpoint que nos trae la información del usuario conectado junto a sus post y número de followers, también que nos muestre el nombre de los followers que siguen al usuario conectado


- [X] El endpoint que trae todos los posts junto a los usuarios que hicieron ese post y junto a los comentarios del post que también traiga los usuarios que hicieron los comentarios


- [X] Endpoint para buscar usuario por nombre


- [X] Endpoint para buscar usuario por id


- [ ] Aplica lo aprendido de testing con Jest y Supertest en alguna parte de tu proyecto, por ejemplo en la parte encargada de los endpoints de usuario


- [/] Crea una documentación de tu proyecto


  - *Comments*


- [X] CRUD comments

- [X] Likes:

Dar un like a un comentario

Quitar like a un comentario


## :cinema: Inspiración 
La idea principal con la que he construido este proyecto es intentar emular lo máximo posible algunas de las redes sociales más de moda. Por ello, se ha intentado implementar los campos que normalmente se rellenan en este tipo de aplicaciones con las funcionalidades que permiten. Por ejemplo, un mismo usuario puede darse like a sus publicaciones o comentarios, sin embargo, no podría seguirse a sí mismo.
Siguiendo este desarrollo, se ha montado un backend con NodeJS utilizando MongoDB junto con su ODM Mongoose.

--------------- 
# :books: Documentacion de API :books:
Se ha utilizado Postman para ir probando cada uno de los endpoints creados para diversas funciones. Además, se ha aprovechado una funcionalidad en postman: en la categoría environments, se han añadido dos: deploy y develop. El objetivo de esto es coger la url de localhost para develop, y la url que ya nos proporciona Heroku en deploy una vez hemos desplegado la API en heroku.
![foto](/uploadsreadme/psotman.png)

---------------
# :ballot_box_with_check: Validaciones hechas en el proyecto :ballot_box_with_check:
- Usuario: 
  - Su email debe ser único
  - Obligatorio rellenar username, password, email y edad.
  - Imagen opcional.
  - Un usuario no se puede seguir a sí mismo.
  - Un usuario no puede seguir a alguien que esté registrado pero aún no haya confirmado su email.

- Posts
  - Obligatorio introducir título y body del post.
  - Imagen opcional.
  - Solo le puedes dar like al post una vez. No se acumulan likes del mismo usuario.

- Comentarios
  - Obligatorio introducir título y body del comentario.
  - Imagen opcional.
   - Solo le puedes dar like al comentario una vez. No se acumulan likes del mismo usuario.
-------------------
# :bowtie: Función del administrador :bowtie:
- Usuarios: 
  - Obtener toda la información de los usuarios, junto con todos sus posts y comentarios.
  - Obtener todos los usuarios registrados en la página(incluyendo los que no confirman email)
  - Obtener los usuarios en línea.
  - Borrar cualquier usuario.

- Comentarios
  - Obtener todos los comentarios hechos en la red social

-----------------------------
# :pager: _**Endpoints**_ :pager:


 <center><b> Usuarios </b></center>




| MÉTODO | ROL| ENDPOINT | LINK |
| --- | --- | --- | --- |
| POST | Público |{{url}}/users | [Crear usuario](#registrarse) |
| GET | Registrado | {{url}}/users/login | [Login](#inicio-de-sesión) |
| DELETE | Registrado | {{url}}/users/logout | [Logout](#cerrar-sesión) |
| GET | Registrado | {{url}}/users/myinfo | [Info user conectado](#info-del-user-conectado) |
| GET | Registrado | {{url}}/users/yourPostsAndComment | [Tus posts y comentarios](#post-y-comments-del-usuario-conectado) |
| GET | Registrado | {{url}}/users/id/:_id | [Buscar por id](#buscar-usuarios-por-id) |
| GET | Registrado | {{url}}/users/username/ma | [Buscar por username](#buscar-usuario-por-username) |
| PUT | Registrado | {{url}}/users/followUser/:_id | [Seguir](#seguir-usuarios) |
| PUT | Registrado | {{url}}/users/unfollowUser/:_id | [Dejar de seguir](#dejar-de-seguir-a-usuarios) |
| DELETE | Registrado | {{url}}/users/yourUserDelete | [Borrarse](#borrar-usuario) |
| GET | Admin | {{url}}/users/ | [Todos los users registrados](#mostrar-usuarios-registrados) |
| GET | Admin | {{url}}/users/allconnects | [Todos los users conectados](#mostrar-usuarios-en-linea) |
| GET | Admin | {{url}}/users/usersPostsComments | [Toda info users](#mostrar-usuarios-en-linea-con-todos-sus-postscomment) |
| DELETE | Admin | {{url}}/users/userId/:_id| [Borrar cualquier user](#borrar-cualquier-usuario) |

-----------------------
<b> Posts </b>


| MÉTODO | ROL| ENDPOINT | LINK |
| --- | --- | --- | ---|
| POST | Registrado | {{url}}/posts | [Crear post](#crear-post) |
| PUT | Registrado/Author | {{url}}/posts/id/:_id | [Modificar post](#modificar-post) |
| DELETE | Registrado/author | {{url}}/posts/id/:_id | [Borrar post](#borrar-post) |
| GET | Registrado | {{url}}/posts/?page=1 | [Mostrar todos los post](#mostrar-todos-los-post) |
| GET | Registrado | {{url}}/posts/id/:_id | [Buscar por id](#buscar-post-por-id) |
| GET | Registrado | {{url}}/posts/title/pat | [Buscar por título](#buscar-post-por-título) |
| PUT | Registrado | {{url}}/posts/likes/:_id | [Like a post](#dar-like-a-post) |
| PUT | Registrado | {{url}}/posts/dislikes/:_id | [Quitar like a post](#dar-dislike-a-post) |

---------------------------------

<center><b> Comentarios </b></center>


| MÉTODO | ROL| ENDPOINT | LINK |
| --- | --- | --- | ---|
| POST | Registrado | {{url}}/comments/idpost/:_id | [Crear comentario](#crear-comentario) |
| PUT | Registrado/author | {{url}}/comments/idcomment/:_id | [Modificar comentario](#modificar-comentario) |
| DELETE | Registrado/author | {{url}}/comments/id/:_id | [Borrar comentario](#borrar-comentario) |
| GET| Registrado | {{url}}/comments/id/:_id | [Buscar por id](#mostrar-por-id-comentario) |
| GET | Admin | {{url}}/comments/ | [Mostrar todos los comentarios](#mostrar-todos-los-comentarios) |
| PUT | Registrado |{{url}}/comments/likesComment/:_id | [Dar like a comentarios](#dar-like-a-comentario) |
| PUT | Registrado |{{url}}/comments/dislikesComment/:_id | [Quitar like](#dislike-a-comentario) |





#  Usuarios :relaxed:

## Registrarse

**(Publico) POST** - `{{url}}/users/` 

Endopoint que sirve para introducir un usuario en la BBDD, automáticamente se le asigna el rol de usuario, la contraseña se guarda codificada para que no sea accesible y el usuario queda pendiente de confirmación via mail. Este procedimiento anida diversas verificaciones, que son las siguientes: el email debe ser único, y los campos de username, age, email y password deben ser obligatorios para rellenar. Sin embargo, la imagen no es obligatoria. Al usar el middleware Multer para adjuntar imágenes, debemos tener en cuenta lo siguiente:
- En la ruta debemos añadir:
`````
uploadUserAvatar.single('upload'),
`````
- de forma que se nos quedaría así:
````
router.post('/', uploadUserAvatar.single('upload'), UserController.register)
````
Esto nos permite usar el midleware Multer para poder adjuntar una imagen con cada nuevo usuario.  Al usar Multer, es necesario poner la información dentro del Body, pero en form-data, y en el campo upload, seleccionar tipo:File:

Body:
| KEY | VALUE |
| --- | --- |
| username | patata |
| age | 28 |
| email | mekhi42z_d859n@yefx.info |
| description | Un juego de dos maravillosos aguacates únicos |
| password| test |
| upload| 03.jpg |
```

Respuesta:
```JSON
{
    "message": "Usuario registrado con éxito",
    "user": {
        "username": "Patata",
        "age": 28,
        "email": "mekhi42z_d859n@yefx.info",
        "confirmed": false,
        "postsId": [],
        "favList": [],
        "favComments": [],
        "commentsId": [],
        "following": [],
        "followers": [],
        "img": "1654424975059-219988.png",
        "role": "user",
        "_id": "629c858ff3a2e6daec34a4f1"
    }
}
```

-------------------------------

## Inicio de sesión

**(Registrado) GET** - `{{url}}/users/login` 

Endpoint que sirve para iniciar sesión, esto genera un token de sesión, las credenciales se introducen vía Body.

Body:
```JSON
{
    "email": "mekhi42z_d859n@yefx.info",
    "password": "test"
}
```
Respuesta inicial:
````
No has verificado el usuario, revisa tu correo.
````
Respuesta al verificar el correo:
```JSON
{"message": "Bienvenidx a nuestra suuuper red social Patata!!",
    "user": {
        "_id": "629c8851a2d9181ed80942e7",
        "username": "Patata",
        "age": 28,
        "email": "mekhi42z_d859n@yefx.info",
        "confirmed": true,
        "postsId": [],
        "favList": [],
        "favComments": [],
        "commentsId": [],
        "following": [],
        "followers": [],
        "img": "1654425681376-219988.png",
        "role": "user"
    }
}
```

------------------------

## Cerrar sesión

**(Registrado) DELETE** - `{{url}}/users/logout` 

Endpoint que sirve para cerrar sesión de un usuario activo.

Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |

Respuesta:
```JSON
{
    "message": "Desconectado con éxito"
}
```

----------------------

## Info del user conectado

**(Registrado) GET** - `{{url}}/users/myinfo`

Endpoint que sirve para traer los datos del usuario que está en linea en este momento.

Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |


Body:
```JSON
{
    "Followers": 0,
    "Following": 0,
    "Number_of_posts": 0,
    "user": {
        "_id": "629c8a1263f7eecbbc87bd09",
        "username": "Maria",
        "age": 29,
        "email": "zlebsackz_v167l@yefx.info",
        "confirmed": true,
        "postsId": [],
        "favList": [],
        "favComments": [],
        "commentsId": [],
        "following": [],
        "followers": [],
        "img": "1654426129501-flat-faces-icons-circle-16.png",
        "role": "user"
    }
}
```
-------------------------------
## Post y comments del usuario conectado
**(Registrado) GET** - `{{url}}/users/yourPostsAndComment`

Endpoint que sirve para traer los datos del usuario en linea en ese momento, junto con sus posts y comentarios.

Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |


Body:
```JSON
{
    "_id": "629c8a1263f7eecbbc87bd09",
    "username": "Maria",
    "postsId": [
        {
            "_id": "629c8be363f7eecbbc87bd17",
            "title": "PATATAAA",
            "body": "imagen genial",
            "commentsId": [
                {
                    "_id": "629c8df9ca6a2c158962874d",
                    "title": "menudo patatote",
                    "userId": {
                        "_id": "629c8a1263f7eecbbc87bd09",
                        "username": "Maria",
                        "email": "zlebsackz_v167l@yefx.info",
                        "img": "1654426129501-flat-faces-icons-circle-16.png"
                    }
                },
                {
                    "_id": "629c8e35b3bdb962c5482365",
                    "title": "menudo patatotex2",
                    "userId": {
                        "_id": "629c8a1263f7eecbbc87bd09",
                        "username": "Maria",
                        "email": "zlebsackz_v167l@yefx.info",
                        "img": "1654426129501-flat-faces-icons-circle-16.png"
                    }
                }
            ]
        },
        {
            "_id": "629c8c21ca6a2c1589628741",
            "title": "yupiiiiii",
            "body": "wooooooow",
            "commentsId": []
        }
    ],
    "favList": []
}
```
---------------
## Buscar usuarios por id
**(Registrado) GET** - `{{url}}/users/id/629c8cedca6a2c1589628746`

Endpoint que sirve para buscar usuario por id.

Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |


Body:
```JSON
{
    "Followers": 0,
    "Following": 0,
    "Number_of_posts": 0,
    "user": {
        "_id": "629c8cedca6a2c1589628746",
        "username": "Pepito",
        "age": 34,
        "email": "aschadenz_v417l@yefx.info",
        "confirmed": true,
        "postsId": [],
        "favList": [],
        "favComments": [],
        "commentsId": [],
        "following": [],
        "followers": [],
        "img": "1654426861001-146022.png",
        "role": "user"
    }
}
```
----------------
## Buscar usuario por username

**(Registrado) GET** - `{{url}}/users/username/ma`

Endpoint que sirve para buscar usuarios por medio desu username, junto con sus posts.

Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |


Body:
```JSON
{
    "Followers": 0,
    "Following": 0,
    "Number_of_posts": 2,
    "user": [
        {
            "_id": "629c8a1263f7eecbbc87bd09",
            "username": "Maria",
            "age": 29,
            "email": "zlebsackz_v167l@yefx.info",
            "confirmed": true,
            "postsId": [
                {
                    "_id": "629c8be363f7eecbbc87bd17",
                    "title": "PATATAAA",
                    "body": "imagen genial",
                    "img": "1654426595157-1900x920-8-beneficios-de-usar-imagenes-en-nuestros-sitios-web.jpg",
                    "userId": "629c8a1263f7eecbbc87bd09",
                    "likes": [],
                    "commentsId": [
                        "629c8df9ca6a2c158962874d",
                        "629c8e35b3bdb962c5482365"
                    ]
                },
                {
                    "_id": "629c8c21ca6a2c1589628741",
                    "title": "yupiiiiii",
                    "body": "wooooooow",
                    "userId": "629c8a1263f7eecbbc87bd09",
                    "likes": [],
                    "commentsId": []
                }
            ],
            "favList": [],
            "favComments": [],
            "commentsId": [
                "629c8df9ca6a2c158962874d",
                "629c8e35b3bdb962c5482365"
            ],
            "following": [],
            "followers": [],
            "img": "1654426129501-flat-faces-icons-circle-16.png",
            "role": "user"
        }
    ]
}
```
---------------------
## Seguir usuarios
**(Registrado) PUT** - `{{url}}/users/followUser/629c8cedca6a2c1589628746`

Endpoint que sirve para empezar a seguir a un usuario. En la respuesta, primero te muestra al usuario que has seguido(nuevo follower), y después al usuario en linea que le ha dado a seguir(nuevo following).

Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |


Body:
```JSON
{
    "message": "El usuario al que ahora sigues ",
    "user": {
        "_id": "629c8cedca6a2c1589628746",
        "username": "Pepito",
        "age": 34,
        "email": "aschadenz_v417l@yefx.info",
        "confirmed": true,
        "postsId": [],
        "favList": [],
        "favComments": [],
        "commentsId": [],
        "following": [],
        "followers": [
            "629c8a1263f7eecbbc87bd09"
        ],
        "img": "1654426861001-146022.png",
        "role": "user"
    },
    "user2": {
        "_id": "629c8a1263f7eecbbc87bd09",
        "username": "Maria",
        "age": 29,
        "email": "zlebsackz_v167l@yefx.info",
        "confirmed": true,
        "postsId": [
            "629c8be363f7eecbbc87bd17",
            "629c8c21ca6a2c1589628741"
        ],
        "favList": [],
        "favComments": [],
        "commentsId": [
            "629c8df9ca6a2c158962874d",
            "629c8e35b3bdb962c5482365"
        ],
        "following": [
            "629c8cedca6a2c1589628746"
        ],
        "followers": [],
        "img": "1654426129501-flat-faces-icons-circle-16.png",
        "role": "user"
    }
}
```
-----------------------
## Dejar de seguir a usuarios
**(Registrado) PUT** - `{{url}}/users/unfollowUser/629c8cedca6a2c1589628746`

Endpoint que sirve para dejar de seguir a un usuario. En la respuesta, primero te muestra al usuario que has dejado de seguir(quitar follower), y después al usuario en linea que le ha dado a dejar de seguir(quitar following).

Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |


Body:
```JSON
{
    "message": "El usuario al que ahora ya no sigues ",
    "user": {
        "_id": "629c8cedca6a2c1589628746",
        "username": "Pepito",
        "age": 34,
        "email": "aschadenz_v417l@yefx.info",
        "confirmed": true,
        "postsId": [],
        "favList": [],
        "favComments": [],
        "commentsId": [],
        "following": [],
        "followers": [
            "629c8a1263f7eecbbc87bd09"
        ],
        "img": "1654426861001-146022.png",
        "role": "user"
    },
    "user2": {
        "_id": "629c919ab3bdb962c5482377",
        "username": "Ana",
        "age": 30,
        "email": "nadia42u_r53q@yefx.info",
        "confirmed": true,
        "postsId": [
            "629c91eeb3bdb962c548237e",
            "629c91fdb3bdb962c5482382"
        ],
        "favList": [],
        "favComments": [
            "629c8df9ca6a2c158962874d",
            "629c8e35b3bdb962c5482365"
        ],
        "commentsId": [
            "629c9225b3bdb962c5482386"
        ],
        "following": [],
        "followers": [],
        "img": "1654428057941-PngItem_1300380-1.png",
        "role": "user"
    }
}
```
-------------------------
## Modificar usuario
**(Registrado) PUT** - `{{url}}/users/modifyUser` 
- Aquí además, en la ruta debemos añadir:
`````
uploadUserAvatar.single('upload'),
`````
- de forma que en este caso se quedaría así:
```
router.put('/modifyUser', authentication, uploadUserAvatar.single('upload'), UserController.update)
````
Esto nos permite usar el midleware Multer para poder adjuntar una imagen con cada usuario. Este endpoint sirve para modificar al usuario que está en línea. Al usar Multer, es necesario poner la información dentro del Body, pero en form-data:

Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |

Body:
| KEY | VALUE |
| --- | --- |
| username | cambiadoo manolo |
| password | test2 |
| upload| 03.jpg |



Respuesta:
```JSON
{
    "message": "User con id 629c919ab3bdb962c5482377 modificado con éxito",
    "user": {
        "_id": "629c919ab3bdb962c5482377",
        "username": "cambiadoo manolo",
        "age": 30,
        "email": "nadia42u_r53q@yefx.info",
        "confirmed": true,
        "postsId": [
            "629c91eeb3bdb962c548237e",
            "629c91fdb3bdb962c5482382"
        ],
        "favList": [],
        "favComments": [
            "629c8df9ca6a2c158962874d",
            "629c8e35b3bdb962c5482365"
        ],
        "commentsId": [
            "629c9225b3bdb962c5482386"
        ],
        "following": [
            "629c8cedca6a2c1589628746"
        ],
        "followers": [],
        "img": "03.jpg",
        "role": "user"
    }
}
```
---------------------
## Borrar usuario
**(Registrado) DELETE** - `{{url}}/users/yourUserDelete` 

Endpoint para que el usuario que está en linea se pueda borrar de la res social, junto con sus posts y comentarios.
Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |



Respuesta:
```JSON
{
    "message": "Tu usuario borrar ha sido borrado",
    "user": {
        "_id": "629cd4044a18db04f9eef98a",
        "username": "borrar",
        "age": 30,
        "email": "agradyi_d894g@yefx.info",
        "confirmed": true,
        "postsId": [
            "629cd66d4a18db04f9eef991",
            "629cd6744a18db04f9eef995"
        ],
        "favList": [],
        "favComments": [],
        "commentsId": [
            "629cd6854a18db04f9eef999"
        ],
        "following": [],
        "followers": [],
        "role": "user"
    }
}
```
--------------------
## Mostrar usuarios registrados
**(Admin) GET** - `{{url}}/users/` 


Este endpoint nos permite ver, siempre que seamos Admin, todos los usuarios registrados en nuestra red social, hayan confirmado el email o aún no.

Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |


Respuesta:
```JSON
[
    {
        "_id": "629c899e63f7eecbbc87bd03",
        "username": "EL ADMIN",
        "email": "kaci79z_y604x@yefx.info",
        "confirmed": true,
        "img": "1654426014347-businesscostumemalemanofficeusericon-1320196264882354682.png"
    },
    {
        "_id": "629c8a1263f7eecbbc87bd09",
        "username": "Maria",
        "email": "zlebsackz_v167l@yefx.info",
        "confirmed": false,
        "img": "1654426129501-flat-faces-icons-circle-16.png"
    },
    ...
]
```
----------------------
## Mostrar usuarios en linea
**(Admin) GET** - `{{url}}/users/allconnects` 


Este endpoint nos permite ver, siempre que seamos Admin, todos los usuarios en linea en nuestra red social.

Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |


Respuesta:
```JSON
[
    {
        "_id": "629c899e63f7eecbbc87bd03",
        "username": "EL ADMIN",
        "email": "kaci79z_y604x@yefx.info"
    },
    {
        "_id": "629c8a1263f7eecbbc87bd09",
        "username": "Maria",
        "email": "zlebsackz_v167l@yefx.info"
    },
    {
        "_id": "629c8cedca6a2c1589628746",
        "username": "Pepito",
        "email": "aschadenz_v417l@yefx.info"
    },
    {
        "_id": "629c919ab3bdb962c5482377",
        "username": "cambiadoo manolo",
        "email": "nadia42u_r53q@yefx.info"
    }
]
```

-----------------------
## Mostrar usuarios en linea con todos sus posts/comment
**(Admin) GET** - `{{url}}/users/usersPostsComments` 


Este endpoint nos permite ver, siempre que seamos Admin, todos los usuarios en linea en nuestra red social, conjuntamente con sus posts y comentarios, es decir, toda la info de cada usuario.

Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |


Respuesta:
```JSON
[
    {
        "Followers": 0,
        "Following": 0,
        "Number_of_posts": 0,
        "user": {
            "_id": "629c899e63f7eecbbc87bd03",
            "username": "EL ADMIN",
            "email": "kaci79z_y604x@yefx.info",
            "confirmed": true,
            "postsId": [],
            "favList": [],
            "following": [],
            "followers": [],
            "img": "1654426014347-businesscostumemalemanofficeusericon-1320196264882354682.png"
        }
    },
    {
        "Followers": 0,
        "Following": 1,
        "Number_of_posts": 2,
        "user": {
            "_id": "629c8a1263f7eecbbc87bd09",
            "username": "Maria",
            "email": "zlebsackz_v167l@yefx.info",
            "confirmed": true,
            "postsId": [
                {
                    "_id": "629c8be363f7eecbbc87bd17",
                    "title": "PATATAAA",
                    "body": "imagen genial",
                    "img": "1654426595157-1900x920-8-beneficios-de-usar-imagenes-en-nuestros-sitios-web.jpg",
                    "commentsId": [
                        {
                            "_id": "629c8df9ca6a2c158962874d",
                            "title": "menudo patatote",
                            "body": "me encanta!!",
                            "img": "1654427129621-Descargar-imagen-inversa-740x493-1-scaled.jpg",
                            "userId": {
                                "_id": "629c8a1263f7eecbbc87bd09",
                                "username": "Maria",
                                "email": "zlebsackz_v167l@yefx.info",
                                "img": "1654426129501-flat-faces-icons-circle-16.png"
                            }
                        },
                        {
                            "_id": "629c8e35b3bdb962c5482365",
                            "title": "menudo patatotex2",
                            "body": "me encanta!!",
                            "img": "1654427189339-Descargar-imagen-inversa-740x493-1-scaled.jpg",
                            "userId": {
                                "_id": "629c8a1263f7eecbbc87bd09",
                                "username": "Maria",
                                "email": "zlebsackz_v167l@yefx.info",
                                "img": "1654426129501-flat-faces-icons-circle-16.png"
                            }
                        }
                    ]
                },
                {
                    "_id": "629c8c21ca6a2c1589628741",
                    "title": "yupiiiiii",
                    "body": "wooooooow",
                    "commentsId": [
                        {
                            "_id": "629c9225b3bdb962c5482386",
                            "title": "*-*",
                            "body": "como te divierteeees!!",
                            "userId": {
                                "_id": "629c919ab3bdb962c5482377",
                                "username": "cambiadoo manolo",
                                "email": "nadia42u_r53q@yefx.info",
                                "img": "1654444920075-images.png"
                            }
                        }
                    ]
                }
            ],
            "favList": [],
            "following": [
                "629c8cedca6a2c1589628746"
            ],
            "followers": [],
            "img": "1654426129501-flat-faces-icons-circle-16.png"
        }
    },
   ...
    }
]
```
---------------------
## Borrar cualquier usuario
**(Admin) DELETE** - `{{url}}/users/userId/629cd8144a18db04f9eef9a4` 

Endpoint para que el admin pueda borrar cualquier usuario de la red social, junto con sus posts y comentarios. En parámetros se añade la id del usuario a borrar.
Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |



Respuesta:
```JSON
{
    "message": "Usuario con id 629cd8144a18db04f9eef9a4 ha sido borrado",
    "user": {
        "_id": "629cd8144a18db04f9eef9a4",
        "username": "Alonso",
        "age": 22,
        "email": "tyler11b_n598n@yefx.info",
        "confirmed": true,
        "postsId": [],
        "favList": [],
        "favComments": [],
        "commentsId": [],
        "following": [],
        "followers": [],
        "img": "1654446100466-PngItem_1300253.png",
        "role": "user"
    }
}
```
-----------------------
#  Posts :clipboard:

## Crear post
**(Registrado) POST** - `{{url}}/posts` 
- Aquí además, en la ruta debemos añadir:
`````
uploadPostImages.single('upload') 
`````
- de forma que en este caso se quedaría así:
```
router.post('/', authentication, uploadPostImages.single('upload'), PostController.create)
````
Esto nos permite usar el midleware Multer para poder adjuntar una imagen con cada post. Este endpoint sirve para crear un post nuevo. Al usar Multer, es necesario poner la información dentro del Body, pero en form-data:

Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |

Body:
| KEY | VALUE |
| --- | --- |
| title | PATATAAA |
| body | imagen genial |
| upload| 03.jpg |



Respuesta:
```JSON
{
    "message": "se creó el post correctamente",
    "post": {
     "title": "PATATAAA",
        "body": "imagen genial",
        "userId": "629c8a1263f7eecbbc87bd09",
        "img":"03.jpg"
        "likes": [],
        "commentsId": [],
        "_id": "629c8c21ca6a2c1589628741"
    }
}
```
--------------------------------
## Modificar post

**(Registrado) PUT** - `{{url}}/posts/id/629cda3b4a18db04f9eef9b9` 

Este endpoint nos permite modificar un post siempre que sea tuyo, introduciendo por parámetro la id del post que queremos cambiar:

Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |

Middleware Multer para poder adjuntar una imagen con cada nuevo comentario.  Al usar Multer, es necesario poner la información dentro del Body, pero en form-data, y en el campo upload, seleccionar tipo:File:

Body:
| KEY | VALUE |
| --- | --- |
|title | CAMBIAO|
| body | lorem lorem |
| upload| 03.jpg |



Respuesta:
JSON
```
{
    "message": "Post con id 629cda3b4a18db04f9eef9b9 modificado con éxito",
    "post": {
        "_id": "629cda3b4a18db04f9eef9b9",
        "title": "CAMBIAO",
        "body": "lorem lorem",
        "userId": "629c919ab3bdb962c5482377",
        "likes": [],
        "commentsId": [],
        "img": "03.jpg"
    }
}
```
--------------------------------

## Borrar post

**(Registrado) DELETE** - `{{url}}/posts/id/629cdb104a18db04f9eef9c0` 

Este endpoint nos permite borrar un post siempre que sea tuyo, introduciendo por parámetro la id del post que queremos eliminar:

Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |



Respuesta:
JSON
```
{
    "message": "Post con id 629cdb104a18db04f9eef9c0 ha sido borrado",
    "post": {
        "_id": "629cdb104a18db04f9eef9c0",
        "title": "este lo borroo",
        "body": "...",
        "userId": "629c919ab3bdb962c5482377",
        "likes": [],
        "commentsId": []
    }
}
```
---------------------
## Mostrar todos los post
**(Registrado) GET** - `{{url}}/posts/?page=1`

Endpoint que sirve para traer todos los post de la red social, junto con sus comentarios y el usuario que los hizo. El límite está en 10 posts para cada página.

Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |


Body:
```JSON
{
    "Number_of_posts": 5,
    "posts": [
        {
            "_id": "629c8be363f7eecbbc87bd17",
            "title": "PATATAAA",
            "body": "imagen genial",
            "img": "1654426595157-1900x920-8-beneficios-de-usar-imagenes-en-nuestros-sitios-web.jpg",
            "userId": {
                "_id": "629c8a1263f7eecbbc87bd09",
                "username": "Maria",
                "email": "zlebsackz_v167l@yefx.info"
            },
            "commentsId": [
                {
                    "_id": "629c8df9ca6a2c158962874d",
                    "title": "menudo patatote",
                    "body": "me encanta!!",
                    "img": "1654427129621-Descargar-imagen-inversa-740x493-1-scaled.jpg",
                    "userId": {
                        "_id": "629c8a1263f7eecbbc87bd09",
                        "username": "Maria"
                    },
                    "postId": "629c8be363f7eecbbc87bd17",
                    "likes": [
                        "629c919ab3bdb962c5482377"
                    ]
                },
                {
                    "_id": "629c8e35b3bdb962c5482365",
                    "title": "menudo patatotex2",
                    "body": "me encanta!!",
                    "img": "1654427189339-Descargar-imagen-inversa-740x493-1-scaled.jpg",
                    "userId": {
                        "_id": "629c8a1263f7eecbbc87bd09",
                        "username": "Maria"
                    },
                    "postId": "629c8be363f7eecbbc87bd17",
                    "likes": [
                        "629c919ab3bdb962c5482377"
                    ]
                }
            ]
        },
        {
            "_id": "629c8c21ca6a2c1589628741",
            "title": "yupiiiiii",
            "body": "wooooooow",
            "userId": {
                "_id": "629c8a1263f7eecbbc87bd09",
                "username": "Maria",
                "email": "zlebsackz_v167l@yefx.info"
            },
            "commentsId": [
                {
                    "_id": "629c9225b3bdb962c5482386",
                    "title": "*-*",
                    "body": "como te divierteeees!!",
                    "userId": {
                        "_id": "629c919ab3bdb962c5482377",
                        "username": "cambiadoo manolo"
                    },
                    "postId": "629c8c21ca6a2c1589628741",
                    "likes": []
                }
            ]
        },
        ...
    ]
}
```
----------------
## Buscar post por id
**(Registrado) GET** - `{{url}}/posts/id/629c8be363f7eecbbc87bd17`

Endpoint que sirve para buscar post según su id(que introducimos por parámetro) de la red social, junto con sus comentarios. 

Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |


Body:
```JSON
{
    "_id": "629c8be363f7eecbbc87bd17",
    "title": "PATATAAA",
    "body": "imagen genial",
    "img": "1654426595157-1900x920-8-beneficios-de-usar-imagenes-en-nuestros-sitios-web.jpg",
    "userId": "629c8a1263f7eecbbc87bd09",
    "likes": [],
    "commentsId": [
        "629c8df9ca6a2c158962874d",
        "629c8e35b3bdb962c5482365"
    ]
}
```
----------------
## Buscar post por título
**(Registrado) GET** - `{{url}}/posts/title/pat`

Endpoint que sirve para buscar post según su título(que introducimos por parámetro) de la red social, junto con sus comentarios. 

Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |


Body:
```JSON
[
    {
        "_id": "629c8be363f7eecbbc87bd17",
        "title": "PATATAAA",
        "body": "imagen genial",
        "img": "1654426595157-1900x920-8-beneficios-de-usar-imagenes-en-nuestros-sitios-web.jpg",
        "commentsId": [
            {
                "_id": "629c8df9ca6a2c158962874d",
                "title": "menudo patatote",
                "body": "me encanta!!",
                "img": "1654427129621-Descargar-imagen-inversa-740x493-1-scaled.jpg"
            },
            {
                "_id": "629c8e35b3bdb962c5482365",
                "title": "menudo patatotex2",
                "body": "me encanta!!",
                "img": "1654427189339-Descargar-imagen-inversa-740x493-1-scaled.jpg"
            }
        ]
    }
]
```
----------------
## Dar like a post
**(Registrado) PUT** - `{{url}}/posts/likes/629c91fdb3bdb962c5482382` 

Este endpoint nos permite dar like a un post introduciendo por parámetro la id del post sobre el que queremos poner el like:

Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |

Respuesta:
JSON
```
{
    "message": "Se dió like correctamente!",
    "post": {
        "_id": "629c91fdb3bdb962c5482382",
        "title": "Aprendiendo",
        "body": "viendo este red social!!",
        "userId": "629c919ab3bdb962c5482377",
        "likes": [
            "629c899e63f7eecbbc87bd03"
        ],
        "commentsId": []
    }
}
```
------------------------
## Dar dislike a post
**(Registrado) PUT** - `{{url}}/posts/dislikes/629c91fdb3bdb962c5482382` 

Este endpoint nos permite quitar like a un post introduciendo por parámetro la id del post sobre el que queremos hacerlo:

Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |

Respuesta:
````
{
    "message": "Dislike hecho con éxito!"
}
````
----------------
#  Comentarios :love_letter:

## Crear comentario

**(Registrado) POST** - `{{url}}/comments/idpost/629c8be363f7eecbbc87bd17` 

Este endpoint nos permite crear diferentes comentarios introduciendo por parámetro la id del post sobre el que queremos poner el comentario:

Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |

Middleware Multer para poder adjuntar una imagen con cada nuevo comentario.  Al usar Multer, es necesario poner la información dentro del Body, pero en form-data, y en el campo upload, seleccionar tipo:File:

Body:
| KEY | VALUE |
| --- | --- |
|title | menudo patatote x2|
| body | me encanta!! |
| upload| 03.jpg |


Respuesta:
JSON
```
{
    "message": "Se creó tu comentario!",
    "comment": {
        "title": "menudo patatotex2",
        "body": "me encanta!!",
        "img": "03.jpg",
        "userId": "629c8a1263f7eecbbc87bd09",
        "postId": "629c8be363f7eecbbc87bd17",
        "likes": [],
        "_id": "629c8e35b3bdb962c5482365"
    }
}
```

-----------------------
## Modificar comentario

**(Registrado) PUT** - `{{url}}/comments/idcomment/629b80783ee6280273ac2cd3` 

Este endpoint nos permite modificar un comentario introduciendo por parámetro la id del comentario sobre el que lo queremos hacer:

Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |

Middleware Multer para poder adjuntar una imagen con cada comentario.  Al usar Multer, es necesario poner la información dentro del Body, pero en form-data, y en el campo upload, seleccionar tipo:File:

Body:
| KEY | VALUE |
| --- | --- |
|title | modificaoooo|
| body | wooooow |
| upload| 03.jpg |


Respuesta:
JSON
```
{
    "message": "Comentario con id 629cde3b4a18db04f9eef9dc modificado con éxito",
    "comment": {
        "_id": "629cde3b4a18db04f9eef9dc",
        "title": "modificaoooo",
        "body": "woooow",
        "img": "03.jpg",
        "userId": "629c919ab3bdb962c5482377",
        "postId": "629cde3b4a18db04f9eef9dc",
        "likes": []
    }
}
```
--------------------------------
## Borrar comentario

**(Registrado) DELETE** - `{{url}}/comments/id/629cde3b4a18db04f9eef9dc` 

Este endpoint nos permite borrar un comentario introduciendo por parámetro la id del comentario sobre el que lo queremos hacer:

Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |


Respuesta:
JSON
```
{
    "message": "Comentario con id 629cde3b4a18db04f9eef9dc ha sido borrado",
    "comment": {
        "_id": "629cde3b4a18db04f9eef9dc",
        "title": "modificaoooo",
        "body": "woooow",
        "img": "1654447733506-fotografia-reproducciones-fotograficas.jpg",
        "userId": "629c919ab3bdb962c5482377",
        "postId": "629cde3b4a18db04f9eef9dc",
        "likes": []
    }
}
```
-----------------------
## Mostrar por id comentario

**(Registrado) GET** - `{{url}}/comments/id/629cdd214a18db04f9eef9d3` 

Este endpoint nos permite buscar un comentario introduciendo por parámetro la id del comentario.

Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |


Respuesta:
JSON
```
{
    "_id": "629cdd214a18db04f9eef9d3",
    "title": "guau",
    "body": "me encantó tu publi",
    "img": "1654447393867-12871b6e8385373148359ec16391f60f.jpg",
    "userId": "629c919ab3bdb962c5482377",
    "postId": "629c8c21ca6a2c1589628741",
    "likes": []
}
```
-------------------
## Mostrar todos los comentarios

**(Admin) GET** - `{{url}}/comments/` 

Este endpoint nos permite traer todos los comentarios, siempre que tengas credencial de Admin.

Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |


Respuesta:
JSON
```
{
    "Number_of_comments": 4,
    "comments": [
        {
            "_id": "629c8df9ca6a2c158962874d",
            "title": "menudo patatote",
            "body": "me encanta!!",
            "img": "1654427129621-Descargar-imagen-inversa-740x493-1-scaled.jpg",
            "userId": "629c8a1263f7eecbbc87bd09",
            "postId": "629c8be363f7eecbbc87bd17",
            "likes": [
                "629c919ab3bdb962c5482377"
            ]
        },
        {
            "_id": "629c8e35b3bdb962c5482365",
            "title": "menudo patatotex2",
            "body": "me encanta!!",
            "img": "1654427189339-Descargar-imagen-inversa-740x493-1-scaled.jpg",
            "userId": "629c8a1263f7eecbbc87bd09",
            "postId": "629c8be363f7eecbbc87bd17",
            "likes": [
                "629c919ab3bdb962c5482377"
            ]
        },
        {
            "_id": "629c9225b3bdb962c5482386",
            "title": "*-*",
            "body": "como te divierteeees!!",
            "userId": "629c919ab3bdb962c5482377",
            "postId": "629c8c21ca6a2c1589628741",
            "likes": []
        },
        {
            "_id": "629cdd214a18db04f9eef9d3",
            "title": "guau",
            "body": "me encantó tu publi",
            "img": "1654447393867-12871b6e8385373148359ec16391f60f.jpg",
            "userId": "629c919ab3bdb962c5482377",
            "postId": "629c8c21ca6a2c1589628741",
            "likes": []
        }
    ]
}
```
-------------------
## Dar like a comentario
**(Registrado) PUT** - `{{url}}/comments/likesComment/629c8df9ca6a2c158962874d` 

Este endpoint nos permite dar like a un comentario introduciendo por parámetro la id del comentariot sobre el que queremos poner el like:

Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |

Respuesta:
JSON
```
{
  "message": "Le diste like!",
   "comment": {
    "_id": "629c8df9ca6a2c158962874d",
    "title": "menudo patatote",
    "body": "me encanta!!",
    "img": "1654427129621-Descargar-imagen-inversa-740x493-1-scaled.jpg",
    "userId": "629c8a1263f7eecbbc87bd09",
    "postId": "629c8be363f7eecbbc87bd17",
    "likes": [
        "629c919ab3bdb962c5482377"
        
    ]
    }
}
```
----------------------------
## Dislike a comentario
**(Registrado) PUT** - `{{url}}/comments/dislikesComment/629c8df9ca6a2c158962874d` 

Este endpoint nos permite deshacer un like a un comentario introduciendo por parámetro la id del comentario sobre el que queremos deshacer el like:

Header:

| KEY | VALUE |
| --- | --- |
| authorization | Token |

Respuesta:
````
{{url}}/comments/dislikesComment/629c8e35b3bdb962c5482365
````
-------------------

# :dart: Retos presentados :dart:
 ## Borrar en cascada
 Fue importante un buen entendimiento de los parámetros y qué se necesitaba para que cuando un usuario se borrase, todo su contenido fuese igual. Lo mismo sucede al borrar un post, todos sus comentarios se borran también de la base de datos.

 ## Manejo de relación de documentos
Al utilizar ahora una base de datos no relacional, había que adaptar los conocimientos que teníamos de sequelize con include, para ponerlos aquí mediante el método de populate. Además, rellenar cada modelo con un array de elementos, en el caso por ejemplo de que un usuario puede tener varios post, al igual que un post solo podría pertenecer a un usuario, por lo que en esta relación no había array, sino un objeto solamente.

## Validaciones
Tener en cuenta qué acciones te permite realizar una red social y cuáles no. Por ejemplo, un usuario sí puede darle like a su propio post, sin embargo no se puede seguir a sí mismo. Además, restringir los likes a uno solo, con el objetivo de evitar que un mismo usuario pueda llenar del mismo like a un post.

## Uso de heroku
Aprender a desplegar una API mediante el uso de Heroku como herramienta nueva. La API está desplegada en: https://red-social-vaneebg.herokuapp.com/

## Uso de nodemailer
En este caso, pese a que lo habíamos utilizado ya antes, las nuevas restricciones de google para las cuentas de gmail, han hecho que tngamos varios problemas. Finalmente, se cambió la configuración de nodemailer para que acepte correos de outlook y poder trabajar desde ahí.


## Uso de Swagger
Aprender a documentar los endpoints dentro de esta nueva herramienta, cerrando correctamente cada endpoint. Hecho el CRUD de comentarios entero: http://localhost:8080/api-docs/#/Comments

------------------------------

# :purple_heart: Agradecimientos :purple_heart:
A la lead instructor [Sofía](https://github.com/SofiaPinilla), y los dos TA [Germán](https://github.com/GeerDev), [Iván](https://github.com/ivanpuebla10) por ayudarme a ponerme al día en clase cuando he tenido algún asunto de salud, y por solucionar algunos bugs y explicármelos.
A [Xavi](https://github.com/xavi-mat) y a [Ger](https://github.com/Molerog) compi por su gran manejo de Swagger :smile: .

----------------

# :black_nib: Futuras implementaciones :black_nib:

- [ ] Implementación de frontend

- [ ] Ampliar las funciones del admin en la red social, por ejemplo, borrar cualquier post.

- [ ] Sistema de testing con Jest.

- [ ] Borrado en cascada para comentarios hechos en otros posts.

----------------------

# :raised_hands: Autor :raised_hands:


- :smiling_imp: [Vanesa Beltrán](https://github.com/vaneebg)







