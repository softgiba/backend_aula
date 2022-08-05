// importando express
import express from "express";

//instanciando express
const app = express();

// array de grupos para retorno
const grupos = [
    {id: 1, "admin": "Administradores"},
    {id: 2, "gerentes":"Gerentes"},
    {id: 3, "usuarios": "Usuários limitados"}
]
// array de unidades para retorno
const unidades = [
    {id: 1, "Vilhena": "Vilhena"},
    {id: 2, "Cacoal":"Cacoal"},
    {id: 3, "Guajará": "Guajará"}
]

// array de usuarios para retorno
const usuarios = [
    {id: 1, "vicentesilva": "Vicente da Silva"},
    {id: 2, "noesilva":"Noé Silva"},
    {id: 3, "thomesilva": "Thomé Silva"}
]

// Rota vazia
app.get('/', (rep, res) => {
    res.status(200).send('Bem-vindo ao auth');
})

// Rotas para cada array
app.get('/grupos', (rep, res) => {
    res.status(200).json(grupos);
})

app.get('/unidades', (rep, res) => {
    res.status(200).json(unidades);
})

app.get('/usuarios', (rep, res) => {
    res.status(200).json(usuarios);
})

// exportando para o server.js fazer uso
export default app