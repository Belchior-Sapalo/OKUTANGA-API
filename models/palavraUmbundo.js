const db = require('../database/db');
const { DataTypes } = require('sequelize');

const palavrasUmbundo = db.define( 'PalavrasUmbundo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    palavraUmbundo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: false } );
 
module.exports = palavrasUmbundo;