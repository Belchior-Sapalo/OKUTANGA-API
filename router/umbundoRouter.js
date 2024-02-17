const umbundoController = require('../controllers/umbundoController');
const umbundoRouter = require('express').Router();

umbundoRouter.post('/salvarPalavra', umbundoController.salvarPalavra);
umbundoRouter.post('/buscarSignificado_umbundo_portugues', umbundoController.buscarSignificado);

module.exports = umbundoRouter;