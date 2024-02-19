const db = require('../database/db');
const { DataTypes } = require('sequelize');
const palavrasUmbundo = require('./palavraUmbundo');

const palavrasPortugues = db.define( 'PalavrasPortugues', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    palavraPortugues: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: false, tableName: 'palavras_portugues' } );

palavrasPortugues.hasMany(palavrasUmbundo, { as: 'significados', onDelete: 'CASCADE'});
palavrasUmbundo.belongsTo(palavrasPortugues)

function criarTabelas(){
    palavrasPortugues.sync();
    palavrasUmbundo.sync();
}


module.exports = palavrasPortugues;