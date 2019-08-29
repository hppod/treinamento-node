//IMPORTANDO O EXPRESS
const express = require('express')

//IMPORTANDO O MOVIECONTROLLER (ENDPOINTS)
const MovieController = require('./../controllers/movie')

//INSTANCIANDO A FUNÇÃO ROUTER NA CONSTANTE ROUTE (PORTEIRO)
const route = express.Router()

//DEFININDO A ROTA /MOVIES COM ENDPOINT GET
route.get('/movies', MovieController.get)

//DEFININDO A ROTA /MOVIE/:ID COM ENDPOINT GETBYID
route.get('/movie/:id', MovieController.getById)

//EXPORTANDO A CONSTANTE ROUTE PARA SER ACESSADA EM OUTROS PONTOS DA APLICAÇÃO
module.exports = route