import faker from 'faker-br';
import db from '../config/dbConect.js';
import Unidade from '../models/Unidade.js';
import Grupo from '../models/Grupo.js';
// import Usuario from '../models/Usuario.js';
import Rota from '../models/Rota.js';

// estabelecendo e testando a conexão
db.on("error", console.log.bind(console, "Conexão com o banco falhou!"));
db.once("open", () => {
    console.log('Conexão com o banco estabelecida!')
});

/* 
* Função para gerar um numero aleatório entre 1 e 100000,  
* sendo usado para complementar informações que não podem ser repetidas
*/
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


// Popupalando o banco de dados com dados falsos para testes de unidades
//eliminando as rotas existentes
await Unidade.deleteMany();

// função para gerar array de objetos com dados fake para unidade
const unidades = [];
function seedUnidades(qtdunidades) {
    let inserido = 0;
    for (let i = 0; i < qtdunidades; i++) {
        const unidade = {
            nome: faker.company.companyName(),
            email: getRandomInt(1000000) + faker.internet.email(),
            local: faker.address.city(),
            ativo: faker.random.boolean()
        }
        unidades.push(unidade);
    }
    return unidades;
}

seedUnidades(30);
Unidade.collection.insertMany(unidades);
console.log(unidades.length + ' Unidades inseridas!');


// função para passar 10% dos itens do array unidades para cada grupo no array grupos
const unidades_grupos = [];
function seedUnidadesGrupos() {
    // lipar array unidades_grupos
    unidades_grupos.length = 0;
    for (let i = 0; i < (unidades.length * 0.1); i++) {
        unidades_grupos.push(unidades[i]);
        unidades_grupos.sort();
    }
    return unidades_grupos
};



/* 
* Popupalando o banco de dados com dados falsos para testes de rotas
*/
//eliminando as rotas existentes
await Rota.deleteMany();

// função para gerar array de objetos com dados fake para rotas
const rotas = [];

function seedRotas(qtdrotas) {
    for (let i = 0; i < qtdrotas; i++) {
        const rota = {
            nome: faker.internet.domainName(),
            rota: 'http://' + getRandomInt(100000) + faker.internet.domainName(),
            ativo: faker.random.boolean(),
            verbo_get: faker.random.boolean(),
            verbo_put: faker.random.boolean(),
            verbo_patch: faker.random.boolean(),
            verbo_delete: faker.random.boolean(),
            verbo_post: faker.random.boolean()
        }
        rotas.push(rota);
    }
    return rotas;
}
seedRotas(30);
Rota.collection.insertMany(rotas);
console.log(rotas.length + ' Rotas inseridas!');


// função para passar 10% dos itens do array rotas para grupo no array de grupos
const rotas_grupos = [];
function seedRotasGrupos() {
    // lipar array rotas_grupos
    rotas_grupos.length = 0;
    // for (let i = 0; i < (rotas.length * 0.1); i+(random(i, (rotas.length * 0.1)))) {
    for (let i = 0; i < (rotas.length * 0.1); i++) {
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
    }
    return grupos;

}

// }
seedGrupos(30);
await Grupo.collection.insertMany(grupos);
await console.log(grupos.length + ' Grupos inseridos!');


//Deligando a conexão com o banco de dados com mensagem de sucesso ou de erro
db.close((err) => { err ? console.log(err) : console.log('Conexão com o banco encerrada!') });
