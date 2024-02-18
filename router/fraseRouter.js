const fraseController = require('../controllers/fraseController');
const fraseRouter = require('express').Router()

fraseRouter.post('/salvarFrase', fraseController.salvarFrase)

module.exports = fraseRouter;