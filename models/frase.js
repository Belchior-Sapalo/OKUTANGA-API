const db = require('../database/db');
const {DataTypes} = require('sequelize');

const frase = db.define('Frase', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    frase: {
        type: DataTypes.STRING,
        allowNull: false
    },
    traducao: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {timestamps: false, tableName: 'frases_traducao'})

function criarTabela(){
    frase.sync()
}


module.exports = frase;