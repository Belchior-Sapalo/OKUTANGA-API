const Sequelize = require('sequelize');
require('dotenv').config();

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

const db = new Sequelize( DB_NAME, DB_USER, DB_PASSWORD, {
    'host': DB_HOST,
    'dialect': 'mysql'
} );

db.authenticate()
.then(()=>{
    console.log('Conexão ao banco de dados feita com sucesso')
})
.catch((error)=>{
    console.log(`Falha na coneão ao banco de dados: ${error}`)
});

module.exports = db;