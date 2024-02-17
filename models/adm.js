const db = require('../database/db');
const {DataTypes} = require('sequelize');

const administrador = db.define('administrador', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: false });

module.exports = administrador;