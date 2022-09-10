// cabeçalho da documentação
const swaggerHead = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "UserManager",
      description: "API para controlar usuários, grupos, unidades e rotas",
      version: "0.0.1",
      termsOfService: "http://localhost:3030",
      contact: {
        name: "USER Manangers",
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
    paths: {},
  },
  apis: ["./src/routes/*.js"]
};

// exportando para o server.js fazer uso
export default swaggerHead

