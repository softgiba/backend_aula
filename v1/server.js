const http = require("http"); // posteriomente com express vamos usar import
const port = 3000; // definição de porta

//definições do servidor - mensagem de retorno quando acessado
const server = http.createServer((rep, res) => {
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end('Ola mundo!!!');
})

// retorno no terminal com o link
server.listen(port, () => {
    console.log(`Servidor escutando porta http://localhost:${port}`)
})

// executar node server.js