import usuarios from "../models/Usuario.js";
import jwt from 'jsonwebtoken';
import { promisify } from 'util';



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


// Verifica se o usuário tem permissão para acessar o recurso
class PermissaoMidleware {
    // MÉTODO PARA VERIFICAR SE O USUÁRIO TEM PERMISSÃO PARA FAZER GET NA ROTA PASSADA COMO PARÂMETRO
    static verificarPermissao = async (rota_acessada, verbo, req, res, callback) => {

        // recupera todas as rotas que o usuario tem no perfil
        const usuarioPefil = await usuarios.findById(await pegaToken(req));

        // verifica se o usuario está ativo
        if (!usuarioPefil.ativo) {
            return res.status(401).json({ code: 401, message: "Usuário inativo!" })
        }

        // verificar se a rota passada está ativa está ativa



        // verificar pode pode acessar a rota pelo grupo de permissão
        


        // carrega somente as rotas que o usuário tem permissão
        for (let i = 0; i < usuarioPefil.rotas.length; i++) {
            if (usuarioPefil.rotas[i].rota === rota_acessada) {
                if (usuarioPefil.rotas[i]["verbo_" + verbo]) {
                    return await callback();
                } else {
                    return res.status(403).json({ error: true, code: 403, message: "Você não tem permissão para acessar esta rota!" })
                }
            }
        }
    }
}

export default PermissaoMidleware;