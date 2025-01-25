const express=require('express');
const app=express();

const PORT =3000;
const usersRoutes=require('./routes/users')
const characterRoutes =require('./routes/characters.js')
const bodyParser = require('body-parser');
const session = require('express-session');
const isAuthenticated=require('./middlewares/isAuthenticated.js')
const { jwtSecret } = require('./crypto/config'); // Asegúrate de importar un secreto seguro



// Middleware para manejar datos de formularios URL-encoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware
app.use(bodyParser.json());

//- Sesión
app.use(
    session({
      secret:jwtSecret, // Clave secreta para firmar el token (debería ser segura, preferiblemente generada con crypto)
      resave: false, // No guardar cambios en la sesión siempre, solo cuando se realice algún cambio
      saveUninitialized: true, // Se guarda la inicialización de la sesión
      cookie: { secure: false }, // Cambia a 'true' si estás utilizando HTTPS
    })
  );



app.use('/',usersRoutes)//Ruta de usuarios
app.use('/', isAuthenticated,characterRoutes); // Rutas de personajes

 

app.listen(PORT,()=>{
    console.log(`Server listening on port http://localhost:${PORT}`)
})