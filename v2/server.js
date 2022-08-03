const http = require("http"); // posteriomente com express vamos usar import
const port = 3000; // definição de porta

const rotas = {
    '/': 'Bem-vindo ao Auth!',
    '/usuarios': 'Lista de usuarios',
    '/grupos': 'Lista de grupos',
    '/programas': 'Lista de programas',
    '/unidades': 'Lista de unidades'
}

//definições a resposta do servidor - mensagem de retorno quando acessado
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(rotas[req.url]); // identificando o retorno com base na URL de requisição
  })
  
// retorno no terminal com o link
server.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}`)
  })

// executar node server.js
// executar npm run dev