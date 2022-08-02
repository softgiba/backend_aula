import express from "express";

//instanciando express
const app = express();

const grupos = [
    {id: 1, "admin": "Administradores"},
    {id: 2, "gerentes":"Gerentes"},
    {id: 3, "usuarios": "Usuários limitados"}
]

app.get('/', (rep, res) => {
    res.status(200).send('Bem-vindo');
})

app.get('/grupos', (rep, res) => {
    res.status(200).json(grupos);
})

export default app