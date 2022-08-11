// importando express(req, res)
import express from "express";

//instanciando express
const app = express();

// habilitando o uso de json pelo express
app.use(express.json());

// array de grupos para retorno
const grupos = [
    {id: 1, "descricao": "Administradores"},
    {id: 2, "descricao":"Gerentes"},
    {id: 3, "descricao": "Usuários limitados"}
]
// array de unidades para retorno
const unidades = [
    {id: 1, "descricao": "Vilhena"},
    {id: 2, "descricao":"Cacoal"},
    {id: 3, "descricao": "Guajará"}
]

// array de usuarios para retorno
const usuarios = [
    {id: 1, "nome": "Vicente da Silva"},
    {id: 2, "nome":"Noé Silva"},
    {id: 3, "nome": "Thomé Silva"}
]

// Rota vazia
app.get('/', (rep, res, next) => {
    res.status(200).send('Bem-vindo ao auth');
})

// Rotas GET | POST | PUT | DELETE para grupos
//GET TODOS GRUPOS
app.get('/grupos', (req, res) => {
    res.status(200).json(grupos);
})
// GET GRUPO POR ID
app.get('/grupos/:id', (req, res) => {
    let index = buscaGrupo(req.params.id);
    res.json(grupos[index]);
  })
// POST GRUPO
  app.post('/grupos', (req, res) => {
    grupos.push(req.body); // enviando o corpo da requisição
    res.status(201).send('Grupo cadastrado!') //201 Created 
  })
// PUT GRUPO POR ID
  app.put('/grupos/:id', (req, res) => {
    let index = buscaGrupo(req.params.id); // passa o paramentro vindo na requisição
    grupos[index].descricao = req.body.descricao; // usa o paramentro para recuparar um dado no corpo da requisição
    res.json(grupos); // devolve todo array
  })

// DELET GRUPO POR ID
  app.delete('/grupos/:id', (req, res) => {
    let {id} = req.params; 
    let index = buscaGrupo(id); 
    grupos.splice(index, 1); // apaga um elemento conforme o index (poderia apagar mais que 1 se fosse o objetivo) 
    res.send(`Grupo ${id} removido`);
  })
  
  
  /*  Função para localizar a posição no array, 
  por enquanto usaremos desta forma até usarmos um banco de dados*/
  function buscaGrupo(id) {
    return grupos.findIndex(grupo => grupo.id == id)
  }


////----------------------------------------------------------------------

app.get('/unidades', (req, res) => {
    res.status(200).json(unidades);
})

// Rotas GET | POST | PUT | DELETE para UNIDADES
//GET TODOS UNIDADES
app.get('/unidades', (req, res) => {
  res.status(200).json(unidades);
})
// GET UNIDADE POR ID
app.get('/unidades/:id', (req, res) => {
  let index = buscaUnidade(req.params.id);
  res.json(unidades[index]);
})
// POST UNIDADE
app.post('/unidades', (req, res) => {
  unidades.push(req.body); // enviando o corpo da requisição
  res.status(201).send('Unidade cadastrada!') //201 Created 
})
// PUT UNIDADE POR ID
app.put('/unidades/:id', (req, res) => {
  let index = buscaUnidade(req.params.id); // passa o paramentro vindo na requisição
  unidades[index].descricao = req.body.descricao; // usa o paramentro para recuparar um dado no corpo da requisição
  res.json(unidades); // devolve todo array
})

// DELETE UNIDADE POR ID
app.delete('/unidades/:id', (req, res) => {
  let {id} = req.params; 
  let index = buscaUnidade(id); 
  unidades.splice(index, 1); // apaga um elemento conforme o index (poderia apagar mais que 1 se fosse o objetivo) 
  res.send(`Unidade ${id} removida`);
})

/*  Função para localizar a posição no array, 
por enquanto usaremos desta forma até usarmos um banco de dados*/
function buscaUnidade(id) {
  return unidades.findIndex(unidade => unidade.id == id)
}


//-----------------------------------------------------------------------
app.get('/usuarios', (req, res) => {
    res.status(200).json(usuarios);
})

// Rotas GET | POST | PUT | DELETE para USUÁRIOS
//GET TODOS USUÁRIOS
app.get('/usuarios', (req, res) => {
  res.status(200).json(usuarios);
})
// GET USUÁRIO POR ID
app.get('/usuarios/:id', (req, res) => {
  let index = buscaUsuario(req.params.id);
  res.json(usuarios[index]);
})
// POST USUÁRIO
app.post('/usuarios', (req, res) => {
  usuarios.push(req.body); // enviando o corpo da requisição
  res.status(201).send('Usuário cadastrado!') //201 Created 
})
// PUT USUÁRIO POR ID
app.put('/usuarios/:id', (req, res) => {
  let index = buscaUsuario(req.params.id); // passa o paramentro vindo na requisição
  usuarios[index].nome= req.body.nome; // usa o paramentro para recuparar um dado no corpo da requisição
  res.json(usuarios); // devolve todo array
})

// DELET USUÁRIO POR ID
app.delete('/v/:id', (req, res) => {
  let {id} = req.params; 
  let index = buscaUsuario(id); 
  usuarios.splice(index, 1); // apaga um elemento conforme o index (poderia apagar mais que 1 se fosse o objetivo) 
  res.send(`Usuário ${id} removido`);
})

/*  Função para localizar a posição no array, 
por enquanto usaremos desta forma até usarmos um banco de dados*/
function buscaUsuario(id) {
  return usuarios.findIndex(usuario => usuario.id == id)
}


// exportando para o server.js fazer uso
export default app

