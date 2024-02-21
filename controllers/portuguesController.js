const palavraPortugues = require('../models/palavraPortugues');
const palavraUmbundo = require('../models/palavraUmbundo');
const { Op } = require('sequelize');
const db = require('../database/db');

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
        const {palavra} = req.body

        if(!palavra){
            res.
            status(422).
            json({
                'msg': 'Preencha o campo requerido'
            })
        }else{
            const result = await palavraPortugues.findOne({
                where: {
                    palavraPortugues: palavra
                }
            })
            if(!result){
                res.
                status(404).
                json({
                    'msg': 'Palavra não existe no banco de dados'
                })
            }else{
                await palavraPortugues.destroy({
                    where: {
                        id: result.id
                    }
                })
                .then(()=>{
                    res.
                    status(200).
                    json({
                        'msg': 'Palavra excluída com sucesso'
                    })
                })
                .catch((error)=>{
                    res.send(`Falha: ${error}`)
                })
            }
        }
 
    },
    deletarTodasPalavras: async(req, res)=>{
        const transaction = await db.transaction()

        try{
            await palavraUmbundo.destroy({
                where: {},
                transaction,
            })

            await palavraPortugues.destroy({
                where: {},
                transaction,
            })

            await transaction.commit()

            res
            .status(200)
            .json({
                "msg": "Todas as palavras do dicionário foram deletadas"
            })
        }catch(error){

            await transaction.rollback();

            res
            .status(422)
            .json({
                "msg": "Falha ao deletar todas as palavras do dicionário"
            })
            console.log(error)
        }
    }
};

module.exports = portuguesController;