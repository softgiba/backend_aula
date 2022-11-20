import faker from 'faker-br';
import db from '../config/dbConect.js';
import Unidade from '../models/Unidade.js';
import Grupo from '../models/Grupo.js';
import Usuario from '../models/Usuario.js';
import Rota from '../models/Rota.js';
import bcrypt from 'bcryptjs';

// estabelecendo e testando a conexão
db.on("error", console.log.bind(console, "Conexão com o banco falhou!"));
db.once("open", () => {
    console.log('Conexão com o banco estabelecida!')
});

// Função para gerar um numero aleatório entre 1 e 1000000,  
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

/*
    Função para inserir unidades no banco de dados
*/
//eliminando as rotas existentes
await Unidade.deleteMany();

// array de unidades do negócio
const unidades_array = ['Matriz', 'Filial 1', 'Filial 2', ' Filial 3']

function getUnidadesNome(i) {
    return unidades_array[i].toString();
}

// array de unidades geradas que será inserida no banco de dados
const unidades = [];

function seedUnidades(qtdunidades) {
    for (let i = 0; i < qtdunidades; i++) {
        const unidade = {
            nome: getUnidadesNome(i),
            localidade: faker.address.city(),
            ativo: true
        }
        unidades.push(unidade);
    }
    return unidades;
}

seedUnidades(unidades_array.length);
await Unidade.collection.insertMany(unidades);
console.log(unidades.length + ' Unidades inseridas!');

// ------------------------------------------------------------

//eliminando as rotas existentes
await Rota.deleteMany();

// rotas que serão inseridas no banco de dados
const rotas = [];

// função para retornar o nome de uma rota pela posição do array
const rotas_array = ['rotas', 'rotas:id',
    'grupos', 'grupos:id',
    'unidades', 'unidades:id',
    'usuarios', 'usuarios:id']
function getRotaName(i) {
    return rotas_array[i].toString();
}

function seedRotas(qtdrotas) {
    for (let i = 0; i < qtdrotas; i++) {
        const rota = {
            rota: getRotaName(i),
            ativo: true,
            verbo_get: true,
            verbo_put: true,
            verbo_patch: true,
            verbo_delete: true,
            verbo_post: true,
        }
        rotas.push(rota);
    }
    return rotas;
}
seedRotas(rotas_array.length);
await Rota.collection.insertMany(rotas);
console.log(rotas.length + ' Rotas inseridas!');

// ---------------------------------------------------------------
//eliminando os grupos existentes
await Grupo.deleteMany();
const grupos = [];

// função para retornar o nome de alguns grupos fictícios
const grupos_array = ['gerente', 'supervisor', 'operador', 'administrador', 'visitante', 'desenvolvedor']

function getGrupoName(i) {
    return grupos_array[i].toString();
}
function seedGrupos(qtdgrupos) {
    for (let i = 0; i < qtdgrupos; i++) {
        const seedGrupos =
        {
            nome: getGrupoName(i),
            descricao: faker.lorem.sentence(),
            ativo: true,
            unidades: unidades,
            rotas: rotas
        }
        grupos.push(seedGrupos);
        // console.log('Grupo ' + i + ' inserido!');
    }
    return grupos;
}
seedGrupos(grupos_array.length)
await Grupo.collection.insertMany(grupos);
console.log(grupos.length + ' Grupos inseridos!');

//---------------------------------------------------------------
// Populando o banco de dados com dados falsos para testes de grupos
//eliminando os grupos existentes
await Usuario.deleteMany();

// usuarios que serão inseridos no banco de dados
const usuarios = [];

function seedUsuario(qtdusuarios) {
    for (let i = 1; i <= qtdusuarios; i++) {
        const seedUsuarios =
        {
            nome: faker.company.companyName(),
            email: getRandomInt(100000000) + faker.internet.email(),
            senha: senhaHash(),
            ativo: faker.random.boolean(),
            link_foto: faker.image.avatar(),
            rotas: rotas,
            grupos: grupos
        }
        usuarios.push(seedUsuarios);
        // console.log('Usuários ' + i + ' inseridos!');
    }
    return usuarios;
}

seedUsuario(30);
await Usuario.collection.insertMany(usuarios);
console.log(usuarios.length + ' Usuarios inseridos!');

// função para encrytar senha usando bcryptjs

function senhaHash() {
    return bcrypt.hashSync('123', 8);
}

//Deligando a conexão com o banco de dados com mensagem de sucesso ou de erro
db.close((err) => { err ? console.log(err) : console.log('Conexão com o banco encerrada!') });