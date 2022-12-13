import usuarios from "../models/Usuario.js";
import rotas from "../models/Rota.js";
import grupos from "../models/Grupo.js";
import unidades from "../models/Unidade.js";
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const falhas = [];

// Recupera o token do header da requisição e extrai o id do usuário
const pegaToken = async (req) => {
    const [, token] = req.headers.authorization.split(' '); // desestruturação
    let decoded = await promisify(jwt.verify)(token, process.env.SECRET); // promisify converte uma função de callback para uma função async/await
    req.user_id = decoded.id;

    if (!decoded) {
        return res.status(401).json({ code: 401, message: "Faltou o token de autorização!" });
    } else {
        return req.user_id;
    }
}

// executa o callback se o usuário tiver permissão para acessar o recurso
const executaCallback = async (user, callback, res, rota_acessada, verbo) => {
    try {
        for (let i = 0; i < user.rotas.length; i++) {
            if (user.rotas[i].rota === rota_acessada) {
                if (user.rotas[i]["verbo_" + verbo]) {
                    return await callback();
                }
            }
        }
    } catch (error) {
        return res.status(500).json({ code: 500, message: "Erro interno do servidor na callback" });
    }
}

// Verifica se o usuário tem permissão para acessar o recurso
class PermissaoMidleware {
    // MÉTODO PARA VERIFICAR SE O USUÁRIO TEM PERMISSÃO PARA FAZER GET NA ROTA PASSADA COMO PARÂMETRO
    static verificarPermissao = async (rota_acessada, verbo, req, res, callback) => {

        // remover todos itens do array de falhas usando pop()
        while (falhas.length > 0) {
            falhas.pop();
        }

        // Carrega perfil do usuário 
        const usuarioPefil = await usuarios.findById(await pegaToken(req));

        // Carregando os dados dos grupos e unidades no peril do usuário com base nos ID dos grupo que ele pertence
        let user = JSON.parse(JSON.stringify(usuarioPefil));
        user.grupos = await grupos.find({ _id: { $in: user.grupos } }).lean();
        for (let i = 0; i < user.grupos.length; i++) {
            user.grupos[i].unidades = await unidades.find({ _id: { $in: user.grupos[i].unidades } }).lean();

            // Carrega as rotas do usuário com base no grupo que ele pertence
            for (let j = 0; j < user.grupos[i].rotas.length; j++) {
                if (!user.grupos[i].rotas[j].ativo) {
                    return res.status(401).json({ code: 401, message: "Rota inativada no grupo " + user.grupos[i].nome + "!" });
                }
            }
        }

        // 1- Verifica se o usuario está ativo no próprio perfil, NAO ESTANDO, todos os verbos e rotas serão bloqueadas
        if (!usuarioPefil.ativo) {
            return res.status(401).json({ code: 401, message: "Usuário inativo, solicite acesso ao administrador do sistema." });
        }

        /* Verificar se a ROTA e VERBO passados estão inativos no cadastro da rota, estando a rota inativa, 
           todos os verbos são impmedidos para todos os usuários, estando apenas o verbo inativo, 
           somente o verbo é impedido para o usuário logado  
        */
        if (!await rotas.findOne({ rota: { $eq: rota_acessada }, ativo: { $eq: true }, ["verbo_" + verbo]: { $eq: true } })) {
            return res.status(401).json({ code: 401, message: "Rota  " + rota_acessada.toUpperCase() + " ou operação " + verbo.toUpperCase() + " estão inativos para todos os usuarios do sistema, contate o administrador do sistema." })
        }

        // Verificar se a rota e verbo passados estão inativos, para o perfil do usuário logado
        for (let i = 0; i < usuarioPefil.rotas.length; i++) {
            if (usuarioPefil.rotas[i].rota === rota_acessada) {
                if (usuarioPefil.rotas[i].ativo && usuarioPefil.rotas[i]["verbo_" + verbo]) {
                    // remover todos itens do array de falhas usando pop()
                    while (falhas.length > 0) {
                        falhas.pop();
                    }
                    await executaCallback(user, callback, res, rota_acessada, verbo);
                }
                else {
                    falhas.push({ code: 401, message: "Rota  " + rota_acessada.toUpperCase() + " ou operação " + verbo.toUpperCase() + " estão inativos para o perfil do usuário logado, contate o administrador do sistema." })
                }
            }
        }

        // verificar se o grupo está ativo no cadastro do grupos de usuários

        
        for (let i = 0; i < user.grupos.length; i++) {
            console.log(user.grupos)
            if (user.grupos[i].ativo) {
                // vefiricar se a rota está ativa no cadastro de grupos de usuários
                for (let j = 0; j < user.grupos[i].rotas.length; j++) {
                    if (user.grupos[i].rotas[j].rota === rota_acessada) {
                        if (user.grupos[i].rotas[j].ativo && user.grupos[i].rotas[j]["verbo_" + verbo]) {
                            await executaCallback(user, callback, res, rota_acessada, verbo);
                        }
                        else {
                            falhas.push({ code: 401, message: "Rota  " + rota_acessada.toUpperCase() + " ou operação " + verbo.toUpperCase() + " estão inativos para o grupo de usuários " + user.grupos[i].nome + ", contate o administrador do sistema." })
                        }
                    }
                }
            } else {
                falhas.push({ code: 401, message: "Grupo " + user.grupos[i].nome + " está inativo, contate o administrador do sistema." })
                console.log(falhas);
            }
        }



        // Verificação autorizativa

        // 4 e 5 PERFIL ROTA ou VERBO ATIVO DIRETAMENTE NO PERFIL: - Verificar se a rota e verbo passados estão inativos, para o perfil do usuário logado
        // for (let i = 0; i < usuarioPefil.rotas.length; i++) {
        //     if (usuarioPefil.rotas[i].rota === rota_acessada) {
        //         if (usuarioPefil.rotas[i].ativo && usuarioPefil.rotas[i]["verbo_" + verbo]) {
        //             await executaCallback(user, rota_acessada, verbo, callback);
        //         }
        //         // else {
        //         //     return res.status(401).json({ code: 401, message: "Rota  " + rota_acessada.toUpperCase() + " ou operação " + verbo.toUpperCase() + " estão inativos para o perfil do usuário logado, contate o administrador do sistema." })
        //         // }
        //     }
        // }

        // //----------------- PERMISSÕES HIERARQUICAMENTE BASEADAS NOS GRUPOS DE USUÁRIOS -----------------//

        // // verificar se o grupo está ativo no cadastro do grupos de usuários
        // for (let i = 0; i < user.grupos.length; i++) {
        //     if (user.grupos[i].ativo) {
        //         // verificar se a rota está ativa no cadastro de grupos de usuários
        //         for (let j = 0; j < user.grupos[i].rotas.length; j++) {
        //             if (user.grupos[i].rotas[j].rota === rota_acessada) {
        //                 if (user.grupos[i].rotas[j].ativo && user.grupos[i].rotas[j]["verbo_" + verbo]) {
        //                     await executaCallback(user, rota_acessada, verbo, callback);
        //                 }
        //                 else {
        //                     return res.status(401).json({ code: 401, message: "Rota  " + rota_acessada.toUpperCase() + " ou operação " + verbo.toUpperCase() + " estão inativos para o grupo " + user.grupos[i].nome + ", contate o administrador do sistema." })
        //                 }
        //             }
        //         }
        //     }
        // }



        if (falhas.length > 0) {
            return res.status(401).json(falhas);
        }
    }
}
// }

export default PermissaoMidleware;