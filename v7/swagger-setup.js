/**
 * Configurações para habilitar Swagger no projeto.
 */
const swaggerDefinition = {
  info: {
    title: "API REST UserManager   em Node.js",
    description: "API para controlar contas e grupos de usuários"
  },
  servers: ["http://localhost:3030"]
}

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"]
};

/**
 * Configura o Swagger UI para a aplicação expressjs.
 * @param {express} app Aplicação express
 */
const setup = app => app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));

module.exports = setup;