const admController = require('../controllers/admControler')
const admRouter = require('express').Router()

admRouter.post('/signIn', admController.criarConta)
admRouter.post('/login', admController.login)

module.exports = admRouter;