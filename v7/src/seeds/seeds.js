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

// Criando um array de objetos com dados de teste para unidades
await Unidade.deleteMany();
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

// Criando um array de objetos com dados de teste para unidades
await Rota.deleteMany();

// function getArrayVerbos() {
//     const seedVerbos = [];
//         for (let i = 1; i <= 4; i++) {
//         seedVerbos.push(
//             {
//                 verbo: faker.random.arrayElement(['GET', 'POST', 'PUT', 'DELETE']),
//                 permitido: faker.random.boolean()
//             }
//         )
//     }
    
//     return seedVerbos;
// }

    for (let i = 1; i <= 10; i++) {
        // console.log(getArrayVerbos());
        const seedRotas = [
            {
                nome: faker.internet.domainName(),
                rota: faker.internet.url(),
                // verbos: getArrayVerbos(),
                verbos: faker.random.objectElement([
                    {'verbo': 'GET', 'permitido': 'true'}, 
                    {'verbo': 'POST', 'permitido': 'false'}, 
                    {'verbo': 'PUT', 'permitido': 'true'}, 
                    {'verbo': 'PATCH', 'permitido': 'false'},
                    {'verbo': 'DELETE', 'permitido': 'true'}]),
                ativo: faker.random.boolean()
            }
        ]
        await Rota.insertMany(seedRotas);
        console.log(seedRotas);
        console.log('Unidade: ' + i + ' inserida!');

    };
    // // Extraindo OID de pessoas para inserir em atendimentos
    // const pessoas = await Pessoa.find();
    // const pessoasOIDArray = pessoas.map(pessoa => pessoa._id).toString().replace(/ObjectId\(/g, '').replace(/\)/g, '').split(',');

    // console.log(pessoasOIDArray);

    // // excluindo todos os atendimentos
    // await Atendimento.deleteMany();

    // // Laço para inserir atendimentos
    // for (let i = 1; i <= 50; i++) {
    //     const seedAtendimentos = [
    //         {
    //             oid_pessoa: faker.random.arrayElement(pessoasOIDArray), // insere com base no array de OID de pessoas
    //             tipo: faker.random.arrayElement([
    //                 'Auxílio Brasil',
    //                 'Passe Livre Estadual',
    //                 'Redução da tarifa da Energia Elétrica',
    //                 'Isenção de taxas em Concursos e Enem',
    //                 'ID Jovem',
    //                 'Passe Livre Federal',
    //                 'Redução da tarifa da Água',
    //                 'Alíquota Reduzida do INSS',
    //                 'Serviços, programas, projetos e benefícios',
    //                 'Cesta Básica', 'PAIF (grupo)',
    //                 'Atendimento Psicossocial',
    //                 'Programa Criança Feliz',
    //                 'BPC/LOAS',
    //                 'SCFV',
    //                 'Informações gerais',
    //                 'Auxílio mortalidade',
    //                 'PAIF (Atendimento especializado)',
    //                 'Programa',
    //                 'Mamãe Cheguei',
    //                 'Programa Crescendo Bem BCP Escola Solicitação de doações em geral']),
    //             observacao: faker.lorem.paragraph(),
    //             dataAtendimento: faker.date.past()
    //         }
    //     ]
    //     await Atendimento.insertMany(seedAtendimentos);
    //     console.log('Atendimento: ' + i + ' inserido!');

    // };

    //Deligando a conexão com o banco de dados com mensagem de sucesso ou de erro
    db.close((err) => { err ? console.log(err) : console.log('Conexão com o banco encerrada!') });