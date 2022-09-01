import swaggerUI from 'swagger-ui-express'; // para documentação com o swagger
import swaggerJsDoc from 'swagger-jsdoc';  // para documentação com o swagger
import app from './src/app.js' // importando apps
import * as dotenv from 'dotenv'; // necessário para leitura do arquivo de variáveis

dotenv.config()

// definição de porta condicional do proxy ou na 3000

const port = process.env.PORT || 3031; 

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Gerenciador de Acessos - API",
      version: '1.0.0',
    },
  },
  apis: ["./src/routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// retorno no terminal com o link
app.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}`)
    // console.log(process.env); // Visualizar as variáveis de ambiente em uso
  })

// executar node server.js
// executar npm run dev