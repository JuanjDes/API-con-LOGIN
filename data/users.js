const { hashPassword } = require('../crypto/config');

const users = [
   { id: 1, username: 'usuario1', password: hashPassword('contraseña1'), name: 'Usuario Uno' },
   { id: 2, username: 'usuario2', password:hashPassword('contraseña2'), name: 'Usuario Dos' },

  ];

  module.exports={users};