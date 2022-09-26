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

// Popupalando o banco de dados com dados falsos para testes de unidades
//eliminando as rotas existentes
await Unidade.deleteMany();

//criando um array de objetos com dados de teste para unidades
for (let i = 1; i <= 10; i++) {
    const seedUnidades = [
        {
            nome: faker.company.companyName(),
            email: faker.internet.email(),
            local: faker.address.city(),
            ativo: faker.random.boolean()
        }
    ]
    await Unidade.insertMany(seedUnidades);
    console.log('Unidade: ' + i + ' inserida!');
};

// Popupalando o banco de dados com dados falsos para testes de rotas
//eliminando as rotas existentes
await Rota.deleteMany();

// Função para gerar um numero aleatório entre 1 e 100000
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//criando um array de objetos com dados de teste para rotas
for (let i = 1; i <= 10; i++) {
    const seedRotas =
    {
        nome: faker.internet.domainName(),
        rota: 'http://' + getRandomInt(100000) + faker.internet.domainName(),
        ativo: faker.random.boolean(),
        verbo_get: faker.random.boolean(),
        verbo_put: faker.random.boolean(),
        verbo_patch: faker.random.boolean(),
        verbo_delete: faker.random.boolean(),
        verbo_post: faker.random.boolean()
    }

    await Rota.insertMany(seedRotas);
    console.log('Rota: ' + i + ' inserida!');
};

// Popupalando o banco de dados com dados falsos para testes de grupos
//eliminando os grupos existentes
await Grupo.deleteMany();

//criando um array de objetos com dados de teste para grupos
const grupoJson = [];

for (let i = 1; i <= 10; i++) {
    const seedGrupos =
    {
        nome: faker.company.companyName(),
        descricao: faker.lorem.sentence(),
        ativo: faker.random.boolean(),
        unidades: [
            {
                oid_unidade: faker.random.uuid(),
                nome: faker.company.companyName(),
                email: faker.internet.email(),
                local: faker.address.city(),
                ativo: faker.random.boolean()
            },
            {
                oid_unidade: faker.random.uuid(),
                nome: faker.company.companyName(),
                email: faker.internet.email(),
                local: faker.address.city(),
                ativo: faker.random.boolean()
            }
        ],
        rotas: [
            {
                nome: faker.internet.domainName(),
                rota: 'http://' + getRandomInt(100000) + faker.internet.domainName(),
                ativo: faker.random.boolean(),
                verbo_get: faker.random.boolean(),
                verbo_put: faker.random.boolean(),
                verbo_patch: faker.random.boolean(),
                verbo_delete: faker.random.boolean(),
                verbo_post: faker.random.boolean()
            }
        ]
    }
    console.log(seedGrupos);
    await Grupo.collection.insertOne(seedGrupos);
    console.log('Grupo: ' + i + ' inserido!');
};

//Deligando a conexão com o banco de dados com mensagem de sucesso ou de erro
db.close((err) => { err ? console.log(err) : console.log('Conexão com o banco encerrada!') });