const umbundoModel = require('../models/palavraUmbundo');
const portuguesModel = require('../models/palavraPortugues')
const db = require('../database/db')
const { Op, Transaction } = require('sequelize');

function formatarPalavra(palavra){
    const palavraFormatada = palavra.slice(0,1).toUpperCase() + palavra.slice(1,palavra.length).toLowerCase();
    return palavraFormatada
}

const umbundoController = {
    salvarPalavra: async(req, res)=>{
        const Transaction = await db.transaction();
        try{
            const { palavraUmbundo, significado } = req.body;

            if(!palavraUmbundo || ! significado){
                res
                .status(400)
                .json({
                    'msg': 'Preesncha todos os campos'
                })
            }else{
                const resultadoBusca = await portuguesModel.findOne({
                    where: {
                        palavraPortugues: significado
                    }
                }, {Transaction});
    
                let novaPalavraPortugues;
        
                if(!resultadoBusca){
                    novaPalavraPortugues = await portuguesModel.create({
                        palavraPortugues: formatarPalavra(significado)
                    }, {Transaction});
                }
    
                await umbundoModel.create({
                    palavraUmbundo: formatarPalavra(palavraUmbundo),
                    PalavrasPortugueId: resultadoBusca ? resultadoBusca.id : novaPalavraPortugues.id
                }, {Transaction})
                .then(()=>{
                    res
                    .status(201)
                    .json({
                        'msg': 'Nova palavra adicionada com sucesso'
                    })
                })
                .catch((error)=>{
                    res
                    .status(400)
                    .json({
                        'msg': 'Flaha ao'
                    })
                })
                await Transaction.commit()
            }

        }catch(error){
            res
            .status(400)
            .json({
                'msg': error
            })

            await Transaction.rollback()
        }   
    },
    buscarSignificado: async(req, res)=>{
        const { palavra } = req.body;
        let significado;

        const resultadoBusca = await umbundoModel.findOne({
            attributes: [ 'palavraUmbundo' ],
            where: {
                palavraUmbundo: palavra
            },

            include: {
                model: portuguesModel,
                attributes: [ 'palavraPortugues' ]
            }
        })

        if(!resultadoBusca){
            res.status(404)
            .json({
                "msg":"Sem resultados! Verifique sua entrada"
            })
        }else{
            significado =  resultadoBusca.PalavrasPortugue.palavraPortugues;
            
            res.json({
                "entrada": resultadoBusca.palavraUmbundo,
                "significado": significado
            })
        }
    }
};

module.exports = umbundoController;