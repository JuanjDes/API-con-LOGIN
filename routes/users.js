const express=require('express');
const router=express.Router();
const {users}=require('../data/users.js')


const { comparePassword } = require('../crypto/config');
const { authenticateToken ,generateToken} = require('../middlewares/authMiddleware.js');
 


//GET /: Página de inicio con formulario de inicio de sesión y enlace al panel de control.
router.get('/', (req, res) => {
      if (req.session.user) {
        // Si volvemos a esta ruta los inputs habrán desaparecido y habrá un enlace a /search  y un botón de logout para deslogarnos.
        // <h1>Bienvenido, ${req.session.user.name}</h1>
        res.send(`
          <h1>Bienvenido</h1>
          <div><a href="/search">Search</a></div>
           <div>
             <form action="/logout" method="POST" style="margin-top: 10px;">
             <button type="submit">Cerrar sesión</button>
             </form>
           </div>
        `);
      } else {
        // Si el usuario no está autenticado, mostrar formulario de login
        res.send(`
          <h1>Inicio de Sesión</h1>
          <form action="/login" method="post">
            <label for="username">Usuario:</label>
            <input type="text" id="username" name="username" required>
            <br>
            <label for="password">Contraseña:</label>
            <input type="password" id="password" name="password" required>
            <br>
            <button type="submit">Iniciar sesión</button>
          </form>
        `);
      }
  });



  //4. Ruta de Inicio de Sesión

//- Ruta que maneja la autenticación del usuario, genera un token y lo almacena en la sesión.
//- POST /login: Endpoint para autenticar y generar un token JWT.
router.post('/login', (req, res) => {

  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  
    if (!user || !comparePassword(password, user.password)) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    const token = generateToken(user);
    req.session.token = token;
    console.log(token)
    req.session.user = {
      id: user.id,
      name: username,
    };
   
    res.redirect('/search');
 
  
  });


  
// router.get('/dashboard', authenticateToken, (req, res) => {
  
  router.get('/search', authenticateToken,(req, res) => {
     
      const userId = req.user;
      const user = users.find((u) => u.id === userId);
     
    if (user) {
       res.send(
        ` <h1>Buscar personaje de Rick and Morty</h1>
          <form action="/process" method="POST">
            <input type="text" name="character" placeholder="Nombre del personaje" required>
            <button type="submit" name="action" value="search">Buscar</button>
            <button type="submit" name="action" value="logout">Logout</button>
          </form>
       `
      );
    } else {
      res.status(401).json({ message: 'Usuario no encontrado' });
    }
  });


  router.post('/process', (req, res) => {
    const { action, character } = req.body;
  
    if (action === 'search') {
      if (!character || character.trim() === '') {
        return res.send('Por favor, introduce un nombre de personaje.');
      }
      // Redirigir a la ruta del personaje
      res.redirect(`/character/${encodeURIComponent(character)}`);
    } else if (action === 'logout') {
      // Manejar el logout
       res.redirect('/logout');
    }
  })

  //- POST /logout: Endpoint para cerrar sesión y destruir la sesión.
  router.post('/logout', (req, res) => {
      req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Error al cerrar sesión.');
      }
      res.redirect('/');
    });

  });
  

module.exports = router;