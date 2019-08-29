//IMPORTANDO O MODELO DA TABELA MOVIE DO BANCO DE DADOS
//(SÓ UTILIZADO QUANDO UTILIZO UM ORM)
const { MovieModel } = require('./../models')

class Movie {

    //IMPLEMENTANDO O ENDPOINT GET QUE BUSCA TODOS OS DADOS NO BANCO DE DADOS
    get(req, res) {

        //UTILIZANDO A FUNÇÃO FIND ALL DO SEQUELIZE PARA BUSCAR TODOS OS DADOS NO BANCO
        MovieModel.findAll({ raw: true })

            //DEFININDO O RESULTADO DO BANCO DE DADOS NA RESPOSTA
            .then((result) => res.status(200).json(result))

            //DEFININDO O ERRO NA RESPOSTA
            .catch((error) => res.status(500).json(error))
    }

    //IMPLEMENTANDO O ENDPOINT GETBYID QUE BUSCA O DADO DE ACORDO COM O PARÂMETRO PASSADO NA ROTA
    getById(req, res) {

        //UTILIZANDO A FUNÇÃO FIND BY PK DO SEQUELIZE PARA BUSCAR O DADO NO BANCO DE ACORDO COM O PARÂMETRO ENVIADO NA ROTA
        MovieModel.findByPk(req.params.id)

            //DEFININDO O RESULTADO DO BANCO DE DADOS NA RESPOSTA
            .then((result) => res.status(200).json(result))

            //DEFININDO O ERRO NA RESPOSTA
            .catch((error) => res.status(500).json(error))
    }

}

//EXPORTANDO A CLASSE MOVIE() INSTANCIADA PARA QUE ELA POSSA SER UTILIZADA POR OUTROS PONTOS DA APLICAÇÃO
module.exports = new Movie()