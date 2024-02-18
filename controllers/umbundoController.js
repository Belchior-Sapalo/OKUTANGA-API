const umbundoModel = require('../models/palavraUmbundo');
const portuguesModel = require('../models/palavraPortugues')
const { Op } = require('sequelize');

function formatarPalavra(palavra){
    const palavraFormatada = palavra.slice(0,1).toUpperCase() + palavra.slice(1,palavra.length).toLowerCase();
    return palavraFormatada
}

const umbundoController = {
    salvarPalavra: async(req, res)=>{
        const { palavraUmbundo, significado } = req.body;

            const resultadoBusca = await portuguesModel.findOne({
                where: {
                    palavraPortugues: significado
                }
            });
    
            let novaPalavraPortugues;
    
            if(!resultadoBusca){
                await portuguesModel.create({
                    palavraPortugues: formatarPalavra(significado)
                });
    
                novaPalavraPortugues = await portuguesModel.findOne({
                    where: {
                        palavraPortugues: significado
                    }
                });
            }
    
            await umbundoModel.create({
                palavraUmbundo: formatarPalavra(palavraUmbundo),
                PalavrasPortugueId: resultadoBusca ? resultadoBusca.id : novaPalavraPortugues.id
            })
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
                    'msg': error
                })
            })
        
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