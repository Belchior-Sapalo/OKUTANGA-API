const fraseController = require('../controllers/fraseController');
const fraseRouter = require('express').Router()

fraseRouter.post('/salvarFrase', fraseController.salvarFrase)
fraseRouter.post('/buscarTraducao', fraseController.buscarTraducao)
fraseRouter.get('/frases', fraseController.todasFrases)
fraseRouter.delete('/deletarFrase', fraseController.deletarFrase)
fraseRouter.delete('/deletarTodasFrases', fraseController.deletarTodasFrases)

module.exports = fraseRouter;