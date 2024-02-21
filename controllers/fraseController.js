const { reset } = require('nodemon');
const fraseModel = require('../models/frase');

function formatarPalavra(palavra){
    const palavraFormatada = palavra.slice(0,1).toUpperCase() + palavra.slice(1,palavra.length).toLowerCase();
    return palavraFormatada
}

const fraseController = {

    salvarFrase: async(req, res) => {
        try{
            const { frase, traducao} = req.body

            if(!frase || !traducao){
                res.status(400).json({
                    'msg': 'Preencha todos os campos'
                })
            }else{
                await fraseModel.create({
                    frase: formatarPalavra(frase),
                    traducao: formatarPalavra(traducao)
                });
    
                res.status(201).json({
                    'msg': 'Nova frase adicionada com sucesso'
                })
            }
        }catch(error){
            res.status(400).json({
                'msg': error
            })
        }
    },
    buscarTraducao: async(req, res)=>{
        const {frase} = req.body

        try{
            const traducao = await fraseModel.findOne({
                attributes: ['traducao'],
                where: {
                    frase,
                }
            })

            if(!traducao){
                res
                .status(404)
                .json({
                    'msg': 'Tradução não encontrdada'
                })
            }else{
                res.send(traducao)
            }
        }catch(error){
            res.status(400).json({
                'msg': error
            })
        }
    },
    todasFrases: async(req, res)=>{
        const frases = await fraseModel.findAll()

        if(frases.length == 0){
            res
            .status(404)
            .json({
                'msg': 'Sem frases salvas'
            })
        }else{
            res.send(frases)
        }
    },
    deletarFrase: async(req, res)=>{
        const {frase} = req.body

        if(!frase){
            res
            .status(422)
            .json({
                'msg': 'Preencha o campo requerido'
            })
        }else{
            const result = await fraseModel.findOne({
                where: {
                    frase,
                }
            })
            if(!result){
                res.
                status(404).
                json({
                    'msg': 'Frase não existe no banco de dados'
                })
            }else{
                await fraseModel.destroy({
                    where: {
                        id: result.id
                    }
                })
                .then(()=>{
                    res.
                    status(200).
                    json({
                        'msg': 'Frase excluída com sucesso'
                    })
                })
                .catch((error)=>{
                    res.status(422).json({
                        "msg": "Falha ao deletar frase"
                    })
                })
            }
        }
 
    },
    deletarTodasFrases: async(req, res)=>{
        await fraseModel.destroy({
            where: {},
            truncate: true
        })
        .then(()=>{
            res
            .status(200)
            .json({
                "msg": "Todas as frases do tradutor foram deletadas"
            })
        })
        .catch((error)=>{
            res.status(422).json({
                "msg": "Falha ao deletar todas as frases do dicionário"
            })
            console.log(error)
        })
    }
}

module.exports = fraseController;