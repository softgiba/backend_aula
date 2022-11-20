import Usuarios from "../models/Usuario.js";

// valiidar se o id é válido
class ValidadorMidleware {

    // validar se o id
    static checaId = (id) => {
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            return id;
        }
        return false;
    }

    // busar o usuario pelo id
    static async buscarUsuario(id) {
        let usuario = await Usuarios.findOne({ _id: id })
        // let nitExist = await usuarios.findOne({ _id: { $ne: id }, nit: req.body.nit })

        await cosonle.log(usuario);
        if (usuario) {
            return usuario;
        }
    }

    static verificaNitCpf = async (idUsuario, chave, valor, falhas) => {
        if (!valor) return
        const pesquisa = { _id: { $ne: idUsuario } }
        pesquisa[chave] = { $eq: valor }
        // buscar outra usuario com o NIT passado na atualização, se houver
        const resultado = await usuarios.findOne(pesquisa);
        if (resultado) {
            falhas.push({ message: upperCase(chave) + "pertence ao cadastro de: " + resultado.nome })
        }
    }
}

export default ValidadorMidleware;
