const portuguesController = require('../controllers/portuguesController');
const portuguesRouter = require('express').Router();

portuguesRouter.get('/palavrasPortugues', portuguesController.buscarTodasPalavras);
portuguesRouter.post('/buscarSignificado_portugues_umbundo', portuguesController.buscarSignificado);

module.exports = portuguesRouter;