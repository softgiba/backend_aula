const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "API CRAS Pimenta Bueno",
        description: "API para controlar usuários, grupos, unidades e rotas",
        version: "0.0.1",
        termsOfService: "http://localhost:3031",
        contact: {
          name: "API-CRAS",
          email: "fslab@fslab.dev",
          url: "fslab.dev"
        },
        license: {
          name: "Lincença: GPLv3",
          url: "https://www.gnu.org/licenses/gpl-3.0.html"
        }
      },
      externalDocs: {
        description: "Documentação detalhada",
        url: "http://localhost:3031/docs"
      },
      servers: [
        {
          url: 'http://localhost:3030',
          description: "API em desenvovlvimento no FSLAB",
        },
        {
          url: 'http://localhost:3030',
          description: "API em produção no FSLAB",
        },
      ],
      tags: [
        {
          name: "pessoas",
          description: "Operações para rota Pessoas"
        },

  
      ],
      paths: {},
    },
    apis: ["./src/routes/*.js"]
  };

  export default swaggerOptions;