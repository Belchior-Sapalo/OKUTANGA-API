const palavraPortugues = require('../models/palavraPortugues');
const palavraUmbundo = require('../models/palavraUmbundo');
const { Op } = require('sequelize');

const portuguesController = {
    buscarTodasPalavras: async(req, res)=>{
        const resultadoBusca = await palavraPortugues.findAll()
        
        if(resultadoBusca.length == 0){
            res
            .status(404)
            .json({"msg": 'Sem resultados'})
        }else{
            res.send(resultadoBusca)
        }
    },
    buscarSignificado: async(req, res)=>{
        const { palavra } = req.body;

        const resultadoBusca = await palavraPortugues.findOne({
            attributes: [ 'palavraPortugues' ],
            where: {
                 palavraPortugues: palavra
            },
            include: {
                model: palavraUmbundo,
                as: 'significados',
                attributes: [ 'palavraUmbundo' ]
            }
        });

        let significados;
        if(!resultadoBusca){
            res
            .status(404)
            .json({"msg":"Sem resultados! Verifique sua entrada"})
        }else{

            significados = resultadoBusca.significados[0].palavraUmbundo

            for(let i = 1; i < resultadoBusca.significados.length; i++){
                significados += ",  " + resultadoBusca.significados[i].palavraUmbundo
            }
            res.json({
                "entrada": resultadoBusca.palavraPortugues,
                "significados": significados
            })
        }
    },
    deletarPalavra: async(req, res)=>{
        const {id} = req.body

        const result = await palavraPortugues.findByPk(id)
        if(!result){
            res.send('Palavra nao existe no banco de dados')
        }else{
            await palavraPortugues.destroy({
                where: {
                    id: id
                }
            })
            .then(()=>{
                res.send('excluida')
            })
            .catch((error)=>{
                res.send(`Falha: ${error}`)
            })
        }

        
    }
};

module.exports = portuguesController;