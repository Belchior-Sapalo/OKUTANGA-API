const portuguesController = require('../controllers/portuguesController');
const portuguesRouter = require('express').Router();

portuguesRouter.get('/palavrasPortugues', portuguesController.buscarTodasPalavras);
portuguesRouter.post('/buscarSignificado_portugues_umbundo', portuguesController.buscarSignificado);
portuguesRouter.delete('/deletarPalavra', portuguesController.deletarPalavra);

module.exports = portuguesRouter;