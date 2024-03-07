const admModel = require('../models/adm');
const bcrypt = require('bcrypt')

const admController = {
    login: async(req, res)=>{
        const { email, senha } = req.body

        if(!email || !senha){
            res
            .status(400)
            .json({
                'msg': 'Preencha todos os campos'
            })
        }else{
            const hashSenha = await admModel.findOne({
                attributes: ['senha']
,                where: {
                    email: email
                }
            })

            if(!hashSenha){
                res
                .status(404)
                .json({
                    'msg': 'Usuário não encontrado'
                })
            }else{
                
                const admNome = await admModel.findOne({
                    attributes: ['nome'],
                    where: {
                        email: email
                    }
                })
                const auth = await bcrypt.compare(senha, hashSenha.senha)
                if(!auth){
                    res
                    .status(400)
                    .json({
                        "auth": auth,
                        'msg': 'Senha incorreta'
                    })
                }else{
                    res
                    .status(200)
                    .json({
                        "auth": auth,
                        'msg': 'logado',
                        "nome": admNome.nome
                    })
                }
            }
        }
    }
}

module.exports = admController;