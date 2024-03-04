# Funcionamiento de la app y gestión del estado

Página de login con 2 botones:
- Botón de Iniciar sesión
    - Envía una petición POST al servidor, enviando usuario y contraseña a /api/auth/signin
    - Recoge el token enviado y lo guarda en local storage, y se redirige a /dashboard

- Botón de crear usuario
    - Abre un nuevo formulario para crear usuario introduciendo usuario, contraseña, email y elegir el rol
        - No se ha creado el usuario correctamente (error)
            - Avisa del error para poder cambiarlo
        - Si se crea usuario correctamente, sale una alerta y vuelve al formulario de login

Tras hacer login correctamente se pasa a la página de dashboard:
- Se hace un fetch (GET /dashboard) a la aplicación
    - Comprueba el token
        - Si no hay token o es incorrecto envía una alerta que primero hay que hacer login para conseguir el token 
        - Si hay token, se muestra en la pantalla los datos que pueda ver ese rol

# Gestión de rutas

Rutas de la API:
- /api/auth/signup &rarr; Ruta para crearse un usuario, se le pasa username, email, password y un array de roles. En caso de no pasársele ningún rol, automáticamente le asignará el rol de usuario. Devuelve un JSON con la información (p.ej, si se ha creado el usuario correctamente un {success: true})

- /api/auth/signin &rarr; Ruta para hacer login, se le pasa un usuario y una contraseña. Desde el back se crea el token, se desencripta la contraseña y se comprueba si es correcta contra la BBDD. Si el login es correcto, devuelve el id delk usuario, el usuario, email, roles, el token y un mensaje de success. Desde el frontend se guarda el token en localStorage

- /api/getDashboard &rarr; Carga el dashboard de la aplicación, dependiendo de tus permisos mediante el token, se verá unos datos u otro. Saldrá un aviso que no se tienen permisos en caso de no haber token o al no ser correcto.

# Requisitos para que funcione
1. Tener instalado un mysql (en mi caso utilicé wampserver ya que crea uno), con una base de datos testdb creada
```BBDD
CREATE DATABASE testdb;
```
2. Si se quieren dejar los datos de login de la base de datos tal y como está (usuario pruebas, contraseña pruebas) habrá que crear un usuario y darle permisos sobre la base de datos
```usuario
CREATE USER 'pruebas'@'localhost' IDENTIFIED BY 'pruebas';
GRANT ALL PRIVILEGES ON testdb.* TO 'pruebas'@'localhost';
```
3. En la primera ejecución será necesario crear los roles y hacer las foreigns key, así que el sync del sequalize de server.js debe ser el 
```server.js
db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Database with { force: true }');
    initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}
```

4. Descargar los modulos de node
```node
npm install
```

5. Ejecutar el server para el back
```
cd .\Back\
node server.js
```

6. (En otra terminal) Ejecutar el front
```
cd .\Front\
npm run dev
```



#Informacióm del proyecto

###Frontend
- [X] Registro.

- [X] Login.

- [X] Acceso protegido a recursos:

   - [X] Rol administrador

   - [X] Rol moderador

- [X] Acceso público
