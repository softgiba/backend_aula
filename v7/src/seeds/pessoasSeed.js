import faker from 'faker-br';
import db from "../config/dbConect.js";
import Pessoa from '../models/Pessoa.js';
import Atendimento from '../models/Atendimento.js';

// Discutindo sobre o uso de async/awaits

// estabelecendo e testando a conexão
db.on("error", console.log.bind(console, "Conexão com o banco falhou!"));
db.once("open", () => {
    console.log('Conexão com o banco estabelecida!')
});

// Criando um array de objetos com dados de teste
await Pessoa.deleteMany();
for (let i = 1; i <= 10; i++) {
    const seedPessoas = [
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
            telefoneContato: faker.phone.phoneNumber()
        }
    ]
    await Pessoa.insertMany(seedPessoas);
    console.log('Pessoa: ' + i + ' inserida!');
};


// Extraindo OID de pessoas para inserir em atendimentos
const pessoas = await Pessoa.find();
const pessoasOIDArray = pessoas.map(pessoa => pessoa._id).toString().replace(/ObjectId\(/g, '').replace(/\)/g, '').split(',');

console.log(pessoasOIDArray);

// excluindo todos os atendimentos
await Atendimento.deleteMany();

// Laço para inserir atendimentos
for (let i = 1; i <= 50; i++) {
    const seedAtendimentos = [
        {
            oid_pessoa: faker.random.arrayElement(pessoasOIDArray), // insere com base no array de OID de pessoas
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
    ]
    await Atendimento.insertMany(seedAtendimentos);
    console.log('Atendimento: ' + i + ' inserido!');

};

//Deligando a conexão com o banco de dados com mensagem de sucesso ou de erro
db.close((err) => { err ? console.log(err) : console.log('Conexão com o banco encerrada!')} );