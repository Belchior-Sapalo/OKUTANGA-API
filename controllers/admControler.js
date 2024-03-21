const admModel = require('../models/adm');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
                const adm = await admModel.findOne({
                    attributes: ['id','nome'],
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
                   const SECRET = process.env.SECRET
                   const token = jwt.sign({admId: adm.id}, SECRET, {expiresIn: '2h'})
                   res
                   .status(200)
                   .json({msg: 'logado', auth, token, status: 200})
                }
            }
        }
    }
}

module.exports = admController;