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
// const unidades_array = ['Matriz', 'Filial 1', 'Filial 2']
const unidades_array = ['Matriz', 'Filial 1', 'Filial 2',
    'Filial 3', 'Filial 4', 'Filial 5',
    'Filial 6', 'Filial 7', 'Filial 8',
    'Filial 9', 'Filial 10', 'Filial 11',
    'Filial 12', 'Filial 13', 'Filial 14',
    'Filial 15', 'Filial 16', 'Filial 17',
    'Filial 18', 'Filial 19', 'Filial 20'
]

function getUnidadesNome(i) {
    return unidades_array[i].toString();
}

// array de unidades geradas que será inserida no banco de dados
const unidades = [];

function seedUnidades(qtdunidades) {
    for (let i = 0; i < qtdunidades; i++) {
        const unidade = {
            nome: getUnidadesNome(i),
            localidade: faker.address.city() + ' - ' + faker.address.state(),
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
// Remover todas as chaves de um array de objetos unidades excepto o id
function removerChavesUnidades(obj) {
    for (let i = 0; i < obj.length; i++) {
        delete obj[i].nome
        delete obj[i].localidade;
        delete obj[i].ativo;
    }
    return obj;
}
//eliminando os grupos existentes
await Grupo.deleteMany();
const grupos = [];

// função para retornar o nome de alguns grupos fictícios
// criar uma constante com 100 grupos diferentes
const grupos_array = [
    'Administrador', 'Gerente', 'Supervisor', 'Operador', 'Vendedor',
    'Analista', 'Coordenador', 'Diretor', 'Presidente', 'Gerente de Vendas',
    'Gerente de Marketing', 'Gerente de RH', 'Gerente de TI', 'Gerente de Finanças',
    'Gerente de Compras', 'Gerente de Logística', 'Gerente de Produção', 'Gerente de Qualidade',
    'Gerente de Segurança', 'Gerente de Manutenção', 'Gerente de Engenharia', 'Gerente de Projetos',
    'Gerente de Operações', 'Gerente de Serviços', 'Gerente de Atendimento', 'Gerente de Suporte',
    'Gerente de Suporte Técnico', 'Gerente de Suporte ao Cliente', 'Gerente de Suporte ao Usuário',
    'Gerente de Suporte ao Usuário Final', 'Gerente de Suporte ao Cliente Final', 'Gerente de Suporte ao Cliente Interno',
]

// const grupos_array = ['administrador', 'gerente', 'operador', 'vendedor', 'cliente', 'fornecedor', 'transportadora', 'funcionario', 'visitante', 'outros']

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
            unidades: removerChavesUnidades(unidades),
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


// Remover todas as chaves de um array de objetos excepto o id
function removerChaves(obj) {
    for (let i = 0; i < obj.length; i++) {
        delete obj[i].nome
        delete obj[i].descricao;
        delete obj[i].ativo;
        delete obj[i].rotas;
        delete obj[i].unidades;
    }
    return obj;
}


function seedUsuario(qtdusuarios) {
    for (let i = 1; i <= qtdusuarios; i++) {
        let nome = faker.name.firstName();
        let nome_meio = faker.name.lastName();
        let sobrenome = faker.name.lastName();
        let email = nome + '.' + sobrenome + '@' + "gmail.com";

        const seedUsuarios =
        {
            nome: nome + ' ' + nome_meio + ' ' + sobrenome,
            email: email.toLowerCase(),
            senha: senhaHash(),
            ativo: true,
            link_foto: faker.image.avatar(),
            rotas: rotas,
            grupos: removerChaves(grupos)

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