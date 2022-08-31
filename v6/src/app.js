// importando express(req, res)
import express from "express";
import db from "./config/dbConect.js";
import routes from "./routes/index.js";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import bodyParser from 'body-parser';

const  options  =  { 
  failOnErrors : true ,  // Se deve ou não lançar ao analisar erros. O padrão é falso. 
  definição : { 
    openapi : '3.0.0' , 
    info : { 
      title : 'Hello World' , 
      version : '1.0.0' , 
    } , 
  } , 
  apis : [ './src/routes*.js' ] , 
}; 


// estabelecendo e testando a conexão
db.on("error", console.log.bind(console, "Conexão com o banco falhou!"));
db.once("open", () => {
  console.log('Conexão com o banco estabelecida!')
});

//instanciando express
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// habilitando o uso de json pelo express
app.use(express.json());


// Passando para o arquivo de rotas o app, que envia junto uma instância do express
routes(app);

// exportando para o server.js fazer uso
export default app