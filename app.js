const express = require('express');
const portuguesRouter = require('./router/portuguesRouter');
const umbundoRouter = require('./router/umbundoRouter');
const admRouter = require('./router/admRouter')
const fraseRouter = require('./router/fraseRouter')
const admModel = require('./models/adm');
const app = express();

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(portuguesRouter);
app.use(umbundoRouter);
app.use(admRouter);
app.use(fraseRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})