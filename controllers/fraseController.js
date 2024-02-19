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
    }
}

module.exports = fraseController;