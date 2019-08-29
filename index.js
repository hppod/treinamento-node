//PORTA DE ENTRADA DO MEU SERVIDOR BACKEND

//MIDDLEWARE É UM CAMINHO ONDE TODAS AS REQUISIÇÕES VÃO PASSAR POR ELE ANTES

//EXPRESS É O RESPONSÁVEL POR TORNAR A NOSSA API UMA API REST (ACESSIVEL POR ROTAS)

//EXEMPLO: MIDDLEWARE DE IPS - TODA REQUISIÇÃO NO MEU BACKEND, PASSA PELOS MIDDLEWARES. SE EU TIVER UM MIDDLEWARE DE IPS, ESSE SERÁ RESPONSÁVEL APENAS POR COLETAR O IP DA REQUISIÇÃO

//IMPORTANDO O EXPRESS
const express = require('express') //MIDDLEWARE

//IMPORTANDO O BODY PARSER
const bodyParser = require('body-parser') //MIDDLEWARE

//IMPORTANDO O CORS
const cors = require('cors') //MIDDLEWARE

//CRIANDO UMA CONSTANTE INSTANCIANDO O EXPRESS
const app = express()

//DEFININDO QUEM É A PORTA DE ENTRADA
const port = process.env.PORT || 3000

//CONFIGURA O APP PRA USAR O CORS
app.use(cors())

//CONFIGURA O APP PRA USAR O BODYPARSER
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: 'application/json' }))

//IMPORTA AS ROTAS DISPONÍVEIS NO CAMINHO /MOVIES
const MovieRoutes = require('./routes/movie')

app.get('/', function (req, res) {
    res.send('Api works')
})

//DIZENDO PRO MEU EXPRESS PRA ONDE A REQUISIÇÃO DEVE SEGUIR
app.use('/', MovieRoutes)

//DIZENDO PRO EXPRESS OUVIR A APLICAÇÃO NA PORTA 3000
app.listen(port, function () {
    console.log(`API listen on port ${port}`)
})

//PRA EXPORTAR A MINHA APLICAÇÃO
module.exports = app