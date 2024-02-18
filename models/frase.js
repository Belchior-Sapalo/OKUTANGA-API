const db = require('../database/db');
const {DataTypes} = require('sequelize');
const traducaoModel = require('./traducao')

const frase = db.define('Frase', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {timestamps: false})

frase.hasOne(traducaoModel, { onDelete: 'CASCADE'})
traducaoModel.belongsTo(frase)

function criarTabelas(){
    frase.sync()
    traducaoModel.sync()
}


module.exports = frase;