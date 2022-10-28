import faker from 'faker-br';
import db from '../config/dbConect.js';
import Unidade from '../models/Unidade.js';
import Grupo from '../models/Grupo.js';
import Usuario from '../models/Usuario.js';
import Rota from '../models/Rota.js';

// estabelecendo e testando a conexão
db.on("error", console.log.bind(console, "Conexão com o banco falhou!"));
db.once("open", () => {
    console.log('Conexão com o banco estabelecida!')
});

// quantidade de unidades, rotas e grupos a serem gerados
let qtd = 1000;
let subdocs = qtd * 0.005;

/* 
* Função para gerar um numero aleatório entre 1 e 1000000,  
* sendo usado para complementar informações que não podem ser repetidas
*/
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


//eliminando as rotas existentes
await Unidade.deleteMany();
console.log('Unidades deletadas!');

// Popupalando o banco de dados com dados falsos para testes de unidades
const unidades = [];
function seedUnidades(qtdunidades) {
    for (let i = 0; i < qtdunidades; i++) {
        const unidade = {
            nome: faker.company.companyName(),
            email: getRandomInt(100000000) + faker.internet.email(),
            local: faker.address.city(),
            ativo: faker.random.boolean()
        }
        unidades.push(unidade);
        // console.log('Unidade ' + i + ' inserida!');
    }
    return unidades;
}

seedUnidades(qtd);
await Unidade.collection.insertMany(unidades);
console.log(unidades.length + ' Unidades inseridas!');


// função para passar 10% dos itens do array unidades para cada grupo no array grupos
const unidades_grupos = [];
function seedUnidadesGrupos() {
    // limpar array unidades_grupos
    unidades_grupos.length = 0;
    for (let i = 0; i < (subdocs); i++) {
        unidades_grupos.push(unidades[ Math.floor(Math.random() * unidades.length) ]);
        unidades_grupos.sort();
        // console.log(unidades_grupos);
    }
    return unidades_grupos
};


/* 
* Populando o banco de dados com dados falsos para testes de rotas
*/
//eliminando as rotas existentes
await Rota.deleteMany();

// função para gerar array de objetos com dados fake para rotas
const rotas = [];

function seedRotas(qtdrotas) {
    for (let i = 0; i < qtdrotas; i++) {
        const rota = {
            nome: faker.internet.domainName(),
            rota: 'http://' + getRandomInt(10000000) + faker.internet.domainName(),
            ativo: faker.random.boolean(),
            verbo_get: faker.random.boolean(),
            verbo_put: faker.random.boolean(),
            verbo_patch: faker.random.boolean(),
            verbo_delete: faker.random.boolean(),
            verbo_post: faker.random.boolean()
        }
        rotas.push(rota);
        // console.log('Rota ' + i + ' inserida!');
    }
    Rota.collection.insertMany(rotas);
    return rotas;
}
seedRotas(qtd);
// await Rota.collection.insertMany(rotas);
console.log(rotas.length + ' Rotas inseridas!');


// função para passar 10% dos itens do array rotas para grupo no array de grupos
const rotas_grupos = [];
function seedRotasGrupos() {
    // lipar array rotas_grupos
    rotas_grupos.length = 0;
    for (let i = 0; i < (subdocs); i++) {
        rotas_grupos.push(rotas[i]);
    }
    return rotas_grupos;
};

// Popupalando o banco de dados com dados falsos para testes de grupos
//eliminando os grupos existentes
await Grupo.deleteMany();
const grupos = [];
function seedGrupos(qtdgrupos) {
    for (let i = 1; i <= qtdgrupos; i++) {
        const seedGrupos =
        {
            nome: faker.company.companyName(),
            descricao: faker.lorem.sentence(),
            ativo: faker.random.boolean(),
            unidades: seedUnidadesGrupos(),
            rotas: seedRotasGrupos()
        }
        grupos.push(seedGrupos);
        // console.log('Grupo ' + i + ' inserido!');
    }
    return grupos;

}

seedGrupos(qtd);
await Grupo.collection.insertMany(grupos);
console.log(grupos.length + ' Grupos inseridos!');


// função para passar 10% dos itens do array rotas para grupo no array de grupos
const grupos_grupos = [];
function seedGruposGrupos() {
    // lipar array rotas_grupos
    grupos_grupos.length = 0;
    for (let i = 0; i < (subdocs); i++) {
        grupos_grupos.push(grupos[i]);
    }
    return grupos_grupos;
};


// Popupalando o banco de dados com dados falsos para testes de grupos
//eliminando os grupos existentes
await Usuario.deleteMany();
const usuarios = [];
function seedUsuario(qtdusuarios) {
    for (let i = 1; i <= qtdusuarios; i++) {
        const seedUsuarios =
        {
            nome: faker.company.companyName(),
            email: getRandomInt(100000000) + faker.internet.email(),
            senha: faker.internet.password(),
            ativo: faker.random.boolean(),
            diretorio_foto: faker.image.avatar(),
            unidades: seedUnidadesGrupos(),
            rotas: seedRotasGrupos(),
            grupos: seedGruposGrupos()
        }
        usuarios.push(seedUsuarios);
        // console.log('Usuários ' + i + ' inseridos!');
    }
    return usuarios;

}

seedUsuario(qtd);
await Usuario.collection.insertMany(usuarios);
console.log(usuarios.length + ' Usuarios inseridos!');




//Deligando a conexão com o banco de dados com mensagem de sucesso ou de erro
db.close((err) => { err ? console.log(err) : console.log('Conexão com o banco encerrada!') });




/* 


*/







