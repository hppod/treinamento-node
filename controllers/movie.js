//IMPORTANDO O MODELO DA TABELA MOVIE DO BANCO DE DADOS
//(SÓ UTILIZADO QUANDO UTILIZO UM ORM)
const { MovieModel } = require('./../models')

const sequelize = require('./../config/config')

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

    //IMPLEMENTANDO O ENDPOINT GETMOVIESPAGE QUE BUSCA OS DADOS E OS RETORNA PAGINADOS
    getMoviesPage(req, res) {
        //VARIAVEIS DA PAGINAÇÃO
        let limit = 8
        let offset = 0
        //VARIAVEIS DA ORDENAÇÃO
        let column = req.params.column
        let order = req.params.order
        //VARIAVEL DE EXIBIÇÃO
        let date_premiere = req.query.date || 'IS NOT NULL'
        //VARIAVEL DE GENERO
        let genre = req.query.genre || 'IS NOT NULL'
        //VARIAVEL DE BUSCA
        let search = req.query.search || 'IS NOT NULL'

        //BUSCAR A QUANTIDADE DE FILMES NO BANCO DE DADOS BASEADO NOS FILTROS
        sequelize.query(
            `SELECT
                COUNT(*) AS ITEMS
            FROM MOVIE
            WHERE GENRE ${genre} AND DATE_PREMIERE ${date_premiere} AND TITLE ${search}`
        )
            .then((data) => {
                const items = data[0][0].ITEMS
                let page = req.params.page
                let pages = Math.ceil(items / limit)
                offset = limit * (page - 1)
                sequelize.query(
                    `SELECT
                    M.ID,
                    M.TITLE,
                    LEFT(M.STORYLINE, 75) AS STORYLINE,
                    M.POSTER_URL,
                    M.DATE_PREMIERE
                FROM MOVIE AS M
                WHERE GENRE ${genre} AND DATE_PREMIERE ${date_premiere} AND TITLE ${search}
                ORDER BY ${column} ${order}
                LIMIT ${limit}
                OFFSET ${offset}`
                )
                    .then((movies) => res.json({ result: movies[0], count: items, pages: pages }).status(200))
                    .catch((error) => res.json(error).status(500))
            })
            .catch((error) => res.json(error).status(500))
    }
}

//EXPORTANDO A CLASSE MOVIE() INSTANCIADA PARA QUE ELA POSSA SER UTILIZADA POR OUTROS PONTOS DA APLICAÇÃO
module.exports = new Movie()