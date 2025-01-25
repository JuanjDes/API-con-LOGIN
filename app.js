const express = require('express');

const app = express();



// escuchamos en puerto 3000
app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});