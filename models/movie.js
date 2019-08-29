//EXPORTANDO O MODELO COM O SEQUELIZE PARA OUTROS PONTOS DA APLICAÇÃO
module.exports = (sequelize, DataTypes) => {

    //DEFININDO O SEQUELIZE
    const MovieModel = sequelize.define('MovieModel', {

        //DEFININDO OS CAMPOS DA TABELA MOVIE DO BANCO DE DADOS
        ID: {
            type: DataTypes.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        TITLE: {
            type: DataTypes.STRING,
            required: true,
            max: 100,
            allowNull: false
        },
        DATE_PREMIERE: {
            type: DataTypes.DATE,
            required: true,
            allowNull: false
        },
        AGE: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false
        },
        DURATION: {
            type: DataTypes.TIME,
            required: true,
            allowNull: false
        },
        GENRE: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
            max: 50
        },
        STORYLINE: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
            max: 1000
        },
        POSTER_URL: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
            max: 2083
        },
        TRAILER_URL: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
            max: 2083
        }
    },

        //PASSANDO PARA O SEQUELIZE O NOME DA TABELA NO BANCO DE DADOS
        {
            tableName: 'MOVIE',
            timestamps: false
        }
    )
    return MovieModel
}