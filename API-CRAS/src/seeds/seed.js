import faker from 'faker-br';
import db from "../config/dbConect.js";
import Pessoa from '../models/Pessoa.js';
import Atendimento from '../models/Atendimento.js';
import Rota from '../models/Rota.js';
import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';

// Discutindo sobre o uso de async/awaits

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
    return Math.floor(Math.random() * max + 1);
}

//Eliminando todos os dados da coleção pessoas e atendimento
await Pessoa.deleteMany();
await Atendimento.deleteMany();

// Criando um array de pessoas para inserir no banco
const pessoas = [];
function seedPessoas(qtdpessoas) {
    for (let i = 1; i <= qtdpessoas; i++) {
        const pessoa =
        {
            nome: faker.name.findName(),
            cpf: faker.br.cpf(),
            dataNascimento: faker.date.past(),
            estrangeiro: false,
            pais: faker.address.country(),
            cep: faker.address.zipCode(),
            logradouro: faker.address.streetName(),
            numero: faker.address.streetAddress(),
            bairro: faker.address.county(),
            cidade: faker.address.city(),
            estado: faker.address.state(),
            telefone: faker.phone.phoneNumber(),
            telefoneContato: faker.name.findName()
        }
        pessoas.push(pessoa);
    }
    return pessoas;
}
seedPessoas(15);
await Pessoa.collection.insertMany(pessoas);
console.log(pessoas.length + ' pessoas inseridas!');



// função para iterar pessoas e retornar oid, nome e cpf
const pessoa_atendida = [];
function seedPessoaAtendida() {
    // limpar array unidades_grupos
    pessoa_atendida.length = 0;
    for (let i = 0; i < (pessoas.length); i++) {
        // pessoas.sort();
        pessoa_atendida.push(pessoas[getRandomInt(i)]);
    }
    return pessoa_atendida
};

seedPessoaAtendida()

// função para gerar atendimentos
const atendimentos = [];
function seedAtendimentos() {
    for (let i = 0; i < pessoa_atendida.length; i++) {
        const atendimento = {
            // oid_pessoa: (pessoa_atendida[i]._id).toString().replace(/ObjectId\(/g, '').replace(/\)/g, ''),
            oid_pessoa: (pessoa_atendida[i]._id),
            nome: pessoa_atendida[i].nome,
            cpf: pessoa_atendida[i].cpf,
            tipo: faker.random.arrayElement([
                'Auxílio Brasil',
                'Passe Livre Estadual',
                'Redução da tarifa da Energia Elétrica',
                'Isenção de taxas em Concursos e Enem',
                'ID Jovem',
                'Passe Livre Federal',
                'Redução da tarifa da Água',
                'Alíquota Reduzida do INSS',
                'Serviços, programas, projetos e benefícios',
                'Cesta Básica', 'PAIF (grupo)',
                'Atendimento Psicossocial',
                'Programa Criança Feliz',
                'BPC/LOAS',
                'SCFV',
                'Informações gerais',
                'Auxílio mortalidade',
                'PAIF (Atendimento especializado)',
                'Programa',
                'Mamãe Cheguei',
                'Programa Crescendo Bem BCP Escola Solicitação de doações em geral']),
            observacao: faker.lorem.paragraph(),
            dataAtendimento: faker.date.past()
        }
        atendimentos.push(atendimento);
    };
    return atendimentos;
};


// três atendimentos para cada pessoa
seedAtendimentos();
seedAtendimentos();
seedAtendimentos();
// console.log(atendimentos);
await Atendimento.collection.insertMany(atendimentos);
console.log(atendimentos.length + ' Atendimentos inseridos!');


//--------------------------------------------------------------
/* 
* Populando o banco de dados com dados falsos para testes de rotas
*/
//eliminando as rotas existentes
await Rota.deleteMany();

// função para gerar array de objetos com dados fake para rotas
const rotas = [];

// função para retornar o nome de uma rota pela posição do array
let rotas_array = [ 'pessoas','pessoas:id', 
                    'atendimentos', 'atendimentos:id', 
                    'rotas', 'rotas:id', 
                    'usuarios', 'usuarios:id']
function getRotaName(i) {
    return rotas_array[i].toString();
}

function seedRotas(qtdrotas) {
    for (let i = 0; i < qtdrotas; i++) {
        const rota = {
            rota: getRotaName(i),
            verbo_get: faker.random.boolean(),
            verbo_put: faker.random.boolean(),            
            verbo_patch: faker.random.boolean(),
            verbo_delete: faker.random.boolean(),
            verbo_post: faker.random.boolean(),
            ativo: true
        }
        rotas.push(rota);
    }
    return rotas;
}
seedRotas(rotas_array.length);
await Rota.collection.insertMany(rotas);
console.log(rotas.length + ' Rotas inseridas!');

// função para passar as rotas para os usuários
const rotas_usuarios = [];
function seedRotasUsuarios(qtd) {
    // lipar array rotas_grupos
    rotas_usuarios.length = 0;
    for (let i = 0; i < (qtd); i++) {
        rotas_usuarios.push(rotas[i]);
    }
    // console.log(rotas_usuarios);
    return rotas_usuarios;
};

//----------------------------------------------------------------------------------------------------------------
// Populando o banco de dados com dados falsos para testes de grupos
// Eliminando os usuarios existentes
// função para encrytar senha usando bcryptjs

function senhaHash() {
    return bcrypt.hashSync('123', 8);
    // return bcrypt.hash('123', 8); // criptografar a senha
}

await Usuario.deleteMany();
const usuarios = [];
async function seedUsuario(qtdusuarios) {
    for (let i = 1; i <= qtdusuarios; i++) {
        const seedUsuarios =
        {
            nome: faker.name.findName(),
            email: getRandomInt(100000000) + faker.internet.email(),
            senha: senhaHash(),         
            ativo: faker.random.boolean(),
            rotas: seedRotasUsuarios(rotas_array.length),
        }
        // console.log(seedUsuarios.senha);
        usuarios.push(seedUsuarios);
        usuarios.senha = senhaHash();
        // console.log(usuarios.senha);
        // console.log('Usuários ' + i + ' inseridos!');
    }
    
    return usuarios;

}

seedUsuario(rotas_array.length);
await Usuario.collection.insertMany(usuarios);
console.log(usuarios.length + ' Usuarios inseridos!');


//Deligando a conexão com o banco de dados com mensagem de sucesso ou de erro
db.close((err) => { err ? console.log(err) : console.log('Conexão com o banco encerrada!') });