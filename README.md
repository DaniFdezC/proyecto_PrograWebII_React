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
- /   &rarr; Carga la aplicación, concretamente el componente App

<br>

- /dashboard &rarr; Carga el componente Dashboard, que este renderiza una ventana, que dependiendo el tipo de acceso que tiene el usuario, se mostrarán unos datos u otros. Por defecto se muestra un aviso de que el token no es correcto, ya que no se ha realizado un login. Una vez se haga el login correctamente se creará el token y es el que se utilizará para mostrar unos datos u otros.

<br>

- /createUser &rarr; Carga el componente para crear usuario, se llama desde el login desde la parte "Sign up", es un pequeño formulario para crear el usuario (nombre, email, password y seleccionar rol)

# Gestión de estados

Los distintos componentes tienen sus estados propios, tales como el username, password, email... etc. El estado se gestiona con una función al crear esa label, con un:
```
onChange={(e) => setUsername(e.target.value)
```
De esta manera nos aseguramos de la renderización constante de los elementos cuando se modifiquen.

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



# Información del proyecto

- [X] Registro.

- [X] Login.

- [X] Acceso protegido a recursos:

   - [X] Rol administrador

   - [X] Rol moderador

- [X] Acceso público
