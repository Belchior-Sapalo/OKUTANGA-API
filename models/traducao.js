const db = require('../database/db');
const {DataTypes} = require('sequelize');

const traducao = db.define('Traducao', {
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

module.exports = traducao;