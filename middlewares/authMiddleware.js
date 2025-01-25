const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../crypto/config');

//si es un middelware
//esta funcion verifica el token
function authenticateToken(req, res, next) {
    const token = req.session.token; // Ahora obtenemos el token desde la sesión
  
    if (!token) {
      return res.status(401).json({ error: 'Token requerido' });
    }
  
  //verfic el token generado anteriormente--> necesita el token, el secreto y una callback (funcionn dentro de otra-- contrla si hay errpr)
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido', error: err.message });
      }
      req.user = decoded.user; // Agregamos el usuario al objeto req para uso posterior
      next(); // Continuamos con el siguiente middleware o controlador
    });
  }

  //No ess un middelware, el token permite que el usuario este validado por determiando tiempo
  // neceistamos : contenido , clave secrtea y opcioneales
  function generateToken(user) {
      return jwt.sign({ user: user.id }, jwtSecret, { expiresIn: '1h' });
    }
  


  
module.exports = { authenticateToken,generateToken };