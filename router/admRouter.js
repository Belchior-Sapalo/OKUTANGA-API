const admController = require('../controllers/admControler')
const portuguesController = require('../controllers/portuguesController')
const umbundoController = require('../controllers/umbundoController')
const fraseController = require('../controllers/fraseController')
const admRouter = require('express').Router()
const jwt = require('jsonwebtoken')

function verificarToken(req, res, next){
    const SECRET = process.env.SECRET
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        res.status(401).json({msg: 'Token não fornecido'})
    }else{
        try{
            const auth = jwt.verify(token, SECRET)
            req.adm = auth
            next()
        }catch(erro){
            res.status(401).json({msg: 'Sem permissão'})
        }
    }
}

admRouter.post('/adm/login', admController.login)
admRouter.post('/adm/adicionar_palavra', verificarToken, umbundoController.salvarPalavra)
admRouter.delete('/adm/deletar_palavra', verificarToken, portuguesController.deletarPalavra)
admRouter.delete('/adm/deletar_todas_palavra', verificarToken, portuguesController.buscarTodasPalavras)
admRouter.post('/adm/adicionar_frase', verificarToken, fraseController.salvarFrase)
admRouter.delete('/adm/deletar_frase', verificarToken, fraseController.deletarFrase)
admRouter.delete('/adm/deletar_todas_frases', verificarToken, fraseController.deletarTodasFrases)

module.exports = admRouter;