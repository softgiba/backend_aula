const http = require("http"); // posteriomente com express vamos usar import
const port = 3001; // definição de porta

const rotas = {
    '/': 'Bem-vindo!',
    '/usuarios': 'Lista de usuarios',
    '/grupos': 'Lista de grupos',
    '/programas': 'Lista de programas',
    '/unidades': 'Lista de unidades'
}

//definições do servidor - mensagem de retorno quando acessado
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(rotas[req.url]);
  })
  
// retorno no terminal com o link
server.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}`)
  })

// executar node server.js
// executar npm run dev