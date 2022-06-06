const api = async function () {
    const express = require('express')
    var cors = require('cors')
    const app = express()
    const port = 3000
    const { Sequelize, DataTypes } = require('sequelize');

    //Configuração do banco
    var dbconfig = require('./DB')

    const sequelize = new Sequelize(dbconfig);

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    //FIM CONFIGURAÇÃO E CONEXÃO

    //Definindo a tabela do banco no sequelize
    var cliente_model = sequelize.define('cliente', {
        id_cliente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        nome: {
            type: DataTypes.STRING,
            allowNull: true
        },
        data_agenda: {
            type: DataTypes.DATE,
            allowNull: true
        },
    },


        //Estanciando a tabela do banco
        {
            tableName: 'cliente',
            createdAt: false,
            updatedAt: false
        }
    )
    //FIM DA DEFINIÇÃO

    app.use(cors())
    app.use(express.json()) // for parsing application/json
    app.use(express.urlencoded({ extended: true }))

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    app.get('/listar_cliente', (req, res) => {
        cliente_model.findAll().then(function (clientes) {
            res.status(200).json(clientes)
        }).catch(function (error) {
            console.log(error)
            res.status(500).json({ mensage: 'Não foi possivel consultar dados' })
        })
    })

    app.post('/cadastrar_cliente', function(req, res) {
        var payload = req.body;
        payload.id = undefined
        delete payload.id
        console.log(payload);
        cliente_model.create(payload).then(function (new_cliente) {
            res.status(200).json({ mesage: 'Cadastrado!' })
        }).catch(function (error) {
            console.log(error)
            res.status(500).json({ mesage: 'Não foi possivel cadastrar' })
        })
    })

    app.get('/deletar/:codigo', (req, res) => {
        var codigo = req.params.codigo
        cliente_model.destroy({
            where: {
                id_cliente: codigo
            }
        }).then(function (deletado) {
            res.status(200).json({ mesage: 'Removido!' })
        }).catch(function (error) {
            console.log(error)
            res.status(500).json({ mesage: 'Não foi possivel deletar' })
        })
    })

    app.get('/buscar/:codigo', (req, res) => {
        var codigo = req.params.codigo
        cliente_model.findOne({
            where: {
                id_cliente: codigo
            }
        }).then(function (encontrado) {
            res.status(200).json({ encontrado })
        }).catch(function (error) {
            console.log(error)
            res.status(500).json({ mesage: 'Não foi possivel Buscar' })
        })
    })

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}

api()