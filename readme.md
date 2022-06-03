1.1.Endpoints
  Posts
[X] Endpoint para crear un post( tiene que estar autenticado)
[X] Endpoint para actualizar un post ( tiene que estar autenticado)
[X] Endpoint para eliminar un post( tiene que estar autenticado)
[X] Endpoint para traer todos los posts junto a los usuarios que hicieron ese post y junto a los comentarios del post
[X] Endpoint para buscar post por nombre
[X] Endpoint para buscar post por id
[X] Implementa validación a la hora de crear un post para que se rellene todos los campos(salvo la imagen, que no sea requerida) y si no se hace que devuelva un mensaje
[X]Paginación de 10 en 10
 Likes:
[X] Endpoint para dar un like a un post
[X] Endpoint para quitar like a un post

[X]  Comments
Endpoint para crear un comentario en un determinado post

 Usuarios
[X] Endpoint para registrar un usuario utilizando bcrypt
[X] Implementa el correo de confirmación para el registro
[X] Endpoint para login(utilizando bcrypt +JWT)
[X] Validación en el login:
Si no has confirmado tu correo no puedes conectarte
[X] Endpoint que nos traiga la información del usuario conectado
[X] Endpoint para el logout
[X] Implementa validación a la hora de crear un usuario para que se rellene todos los campos y si no se hace que devuelva un mensaje

[/] Backend disponible en producción (Heroku).

[X] Middleware para comprobar la autoría del post a la hora de editar/eliminar el mismo.




1.2. Extras
*Importante, si te dispones a hacer los extras de los comentarios se recomienda (si aún no lo has hecho) que crees una colección para los comentarios.

[X] Middleware para comprobar la autoría del comentario a la hora de editar/eliminar el mismo.
[X] Implementa el middleware multer para poder adjuntar imágenes al crear o actualizar posts.
[X] Implementa el middleware multer para poder adjuntar imágenes al crear o actualizar comentarios.
[/] Implementa el middleware multer para poder adjuntar imágenes al crear o actualizar un usuario.
[ ] Implementación de followers:
Que puedas seguir a otros usuarios
Que puedas dejar de seguir a otros usuarios
[ ] El Endpoint que nos trae la información del usuario conectado, además que nos traiga los posts y el número de seguidores que tiene
[ ] Endpoint que nos trae la información del usuario conectado junto a sus post y número de followers, también que nos muestre el nombre de los followers que siguen al usuario conectado
[X] El endpoint que trae todos los posts junto a los usuarios que hicieron ese post y junto a los comentarios del post que también traiga los usuarios que hicieron los comentarios
[X] Endpoint para buscar usuario por nombre
[X] Endpoint para buscar usuario por id
[ ] Aplica lo aprendido de testing con Jest y Supertest en alguna parte de tu proyecto, por ejemplo en la parte encargada de los endpoints de usuario
[ ] Crea una documentación de tu proyecto
Comments
[X] CRUD comments
[X] Likes:
Dar un like a un comentario
Quitar like a un comentario

