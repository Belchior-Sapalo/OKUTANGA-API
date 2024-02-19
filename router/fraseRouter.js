const fraseController = require('../controllers/fraseController');
const fraseRouter = require('express').Router()

fraseRouter.post('/salvarFrase', fraseController.salvarFrase)
fraseRouter.post('/buscarTraducao', fraseController.buscarTraducao)

module.exports = fraseRouter;