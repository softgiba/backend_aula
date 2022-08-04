const http = require("http"); // posteriomente com express vamos usar import
const port = 3002; // definição de porta

const rotas = {
    '/': 'Bem-vindo ao Auth!',
    '/grupos': 'Lista de grupos',
    '/programas': 'Lista de programas',
    '/unidades': 'Lista de unidades',
    '/usuarios': 'Lista de usuarios'
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



/*
Notas:

 npm install nodemon@2.0.15 -D 

Nesta versão usaremos o pacote nodemon 
para quando for alterada as rotas o node 
fazer um reload nas rotas sem a necessidade 
parar o serviço e executar novamente.
Para usar o nodeman fofi alterado o package.json 
criando um script  "dev": "nodemon server.js" e 
para executar no terminal npm run dev 


Por isso foi adicionado no projeto o arquivo .gitignore e 
nele foi citada a pasta node_modules, haja vista não haver 
necessidade de subir para o github/gitlab os módulos 
instalados pelo NPM, mas apenas as pastas e arquivos que vc 
criou ou modificou  
*/