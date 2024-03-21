const fraseController = require('../controllers/fraseController');
const fraseRouter = require('express').Router()

fraseRouter.post('/buscarTraducao', fraseController.buscarTraducao)
fraseRouter.get('/frases', fraseController.todasFrases)

module.exports = fraseRouter;