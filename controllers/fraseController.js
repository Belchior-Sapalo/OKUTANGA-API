const fraseModel = require('../models/frase');

const fraseController = {
    salvarFrase: async(req, res) => {
        try{
            const novaFrase = await fraseModel.create(req.body);

            res.status(201).json({
                'msg': 'Nova frase adicionada com sucesso'
            })
        }catch(error){
            res.status(400).json({
                'msg': error
            })
        }
    },
    buscarTraducao: async(req, res)=>{
        const {frase} = req.body

        try{
            const traducao = await fraseModel.findAll({
                attributes: ['traducao'],
                where: {
                    frase,
                }
            })

            if(traducao.length == 0){
                res
                .status(404)
                .json({
                    'msg': 'Frase não encontrdada'
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