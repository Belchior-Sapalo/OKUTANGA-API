const admController = require('../controllers/admControler')
const admRouter = require('express').Router()

admRouter.post('/login', admController.login)

module.exports = admRouter;