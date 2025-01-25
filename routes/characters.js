const express = require('express');
const axios=require('axios');
const router = express.Router();
const url= `https://rickandmortyapi.com/api/character`

 // Obtener un personaje por nombre
 router.get('/character/:name', async (req, res) => {
    const { name } = req.params; // Obtener el nombre del personaje desde los parámetros de consulta
   
    if (!name) {
      return res.status(400).json({ message: 'Por favor, proporciona un nombre para buscar' });
    }
  
    try {
  
    
      const response = await axios.get(`${url}/?name=${encodeURIComponent(name)}`);
      const filteredCharacters = response.data.results 

      const literal=`<!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>rick and morty </title>
      </head>
      <body>
          <h1>Personajes de Rick and morty </h1>
          <ul>
           ${filteredCharacters.map((character) => 
            `<div>
                <img src="${character.image}"  alt="${character.name}">
                <li>Nombre: ${character.name}</li>
                <li>Status: ${character.status}</li>
                <li>Species: ${character.species}</li>
                <li>Origin: ${character.origin.name}</li>
                </div>
             `
            ).join('')}
          </ul>
          </body>
      </html>`
    res.send(literal);


    } catch (error) {
        res.status(404).json ({error:'Error, personaje no econtrado'})
    }
  });
  

  router.get('/characters', async (req, res) => {
     try {
        
      const response = await axios.get(url);
      const characters = response.data.results 

      res.json(characters);


    } catch (error) {
        res.status(500).json ({mensaje:'No se han podido traer los personajes de la api'})
    }
  });
  
  module.exports = router;