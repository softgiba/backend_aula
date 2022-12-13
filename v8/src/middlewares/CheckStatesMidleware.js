import rotas from "../models/Rota.js";



// valiidar se o id é válido
class CheckStatesMidleware {

    //verificar se a rota passada está inativa, estando todos os verbos serão bloqueados
    static verificaRotaAtiva = async (rota_acessada, req, res) => {
        try {
            if (!await rotas.findOne({ rota: { $eq: rota_acessada }, ativo: { $eq: true } })) {
                console.log("Rota Inativa, contate o administrador do sistema.");
                // return res.status(401).json({ code: 401, message: "Rota Inativa, contate o administrador do sistema." })
            }
        }
        catch (error) {
            console.error(error);
            // return res.status(500).json({ code: 500, message: "Erro interno do servidor" });
        }
    }

    static verificaVerboAtivo = async (rota_acessada, verbo, res) => {
        try {
            if (!await rotas.findOne({ rota: { $eq: rota_acessada }, ["verbo_" + verbo]: { $eq: true } })) {
                return res.status(401).json({ code: 401, message: "Operação " + verbo.toUpperCase() + " para todos usuarios nesta rota está inativa, contate o administrador do sistema." })
            }
        }
        catch (error) {
            return res.status(500).json({ code: 500, message: "Erro interno do servidor" });
        }


    }
}




export default CheckStatesMidleware;
