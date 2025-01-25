//Middelware que verifica si el usuario está autenticado, para permitir acceder a las rutas que hay en el characters.js
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
       next(); // Usuario autenticado, permite el acceso a las rutas para consultar en la api de Rick and Morty
     } else {
       res.redirect('/login'); // Redirigir al login si no está autenticado
     }
   }
 
module.exports = isAuthenticated;