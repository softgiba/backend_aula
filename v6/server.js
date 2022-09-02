import swaggerUI from 'swagger-ui-express'; // para documentação com o swagger
import swaggerJsDoc from 'swagger-jsdoc';  // para documentação com o swagger
import app from './src/app.js' // importando apps
import * as dotenv from 'dotenv'; // necessário para leitura do arquivo de variáveis

dotenv.config()

// definição de porta condicional do proxy ou na 3000

const port = process.env.PORT || 3031; 


// cabeçalho da documentação
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "UserManager",
      description: "API para controlar usuários, grupos, unidades e rotas",
      version: "0.0.1",
      termsOfService: "http://localhost:3030",
      contact:{
        name: "USER Manangers",
        email: "fslab@fslab.dev",
        url: "fslab.dev"
      },
      license:{
        name: "Lincença: GPLv3",
        url: "https://www.gnu.org/licenses/gpl-3.0.html"
      }
    },
    externalDocs:{
      description: "Documentação detalhada",
      url: "https://docs.api.fslab.dev"
    },
    servers: [
        {
          url: 'http://localhost:3030',
          description: "API em desenvovlvimento no FSLAB",
       },
        {
          url: 'http://localhost:3030',
          description: "API em produução no FSLAB",
       },
      ],
    tags: [
      {
        name: "grupos",
        description: "Operações para rota Grupos"
      },
      {
        name: "Rotas",
        description: "Operações para rota de Rotas"
      },
      
      {
        name: "Unidades",
        description: "Operações para rota Unidades"
      },
      {
        name: "Usuarios",
        description: "Operações para rota Usuários"
      },

    ],
    paths: { },
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