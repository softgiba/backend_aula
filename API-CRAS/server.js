import express from 'express';
import app from './src/app.js' // importando app

// necessário para leitura do arquivo de variáveis
import * as dotenv from 'dotenv'; 
// import cors from 'cors';

// configuração do swagger para documentação
import swaggerUI from 'swagger-ui-express'; // para documentação com o swagger
import swaggerJsDoc from 'swagger-jsdoc';  // para documentação com o swagger
import swaggerOptions from './src/docs/head.js'; // importando configurações do swagger

dotenv.config()

// definição de porta condicional do proxy ou na 3000
const port = process.env.PORT || 3031;

// cabeçalho da documentação
const swaggerDocs = swaggerJsDoc(swaggerOptions); // para documentação com o swagger
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs)); // documentação com o swagger

// app.use(cors([
//  {origin: '*' },
//  {methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}
// ])); //  Mude apenas isso: origin: ['https://www.section.io', 'https://www.google.com/']

// Parse requests of content-type - application/json 
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false })); // 

// Logs das requisições
// app.use(morgan('dev'));

// retorno no terminal com o link
app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`)
})

// executar node server.js
// executar usnado o nodemon npm run dev

