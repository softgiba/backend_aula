import usuarios from "../models/Usuario.js";
import grupos from "../models/Grupo.js";
import unidades from "../models/Unidade.js";
import bcrypt from "bcryptjs";
import PermissaoMidleware from '../middlewares/PermissaoMidleware.js';
import ValidadorMidleware from '../middlewares/ValidadorMidleware.js';
class UsuarioController {
  // GET - listar Usuarios por nome com paginação 
  static listarUsuarios = async (req, res) => {
    try {
      return await PermissaoMidleware.verificarPermissao('usuarios', 'get', req, res, async () => {
        const nome = req.query.nome;
        const { page, perPage } = req.query;
        const options = { // limitar a quantidade máxima por requisição
          nome: (nome),
          page: parseInt(page) || 1,
          limit: parseInt(perPage) > 3 ? 3 : parseInt(perPage) || 3
        };
        if (!nome) {
          // retorno da busca desejada
          const usuario = await usuarios.paginate({}, options);
          let user = JSON.parse(JSON.stringify(usuario));
          user.grupos = await grupos.find({ _id: { $in: user.grupos } }).lean();

          // iterando para recuperar os dados de cada unidade cujo ID está cadastrado no grupo
          for (let i = 0; i < user.docs.length; i++) {
            user.docs[i].grupos = await grupos.find({ _id: { $in: user.docs[i].grupos } }).lean();
            for (let j = 0; j < user.docs[i].grupos[j].unidades.length; j++) {
              user.docs[i].grupos[j].unidades = await unidades.find({ _id: { $in: user.docs[i].grupos[j].unidades } }).lean();
            }
          }
          return res.json(user);

        } else {
          // retorno da busca desejada
          const usuario = await usuarios.paginate({ nome: new RegExp(nome, 'i') }, options);
          let user = JSON.parse(JSON.stringify(usuario));
          user.grupos = await grupos.find({ _id: { $in: user.grupos } }).lean();

          // iterando para recuperar os dados de cada unidade cujo ID está cadastrado no grupo
          for (let i = 0; i < user.docs.length; i++) {
            user.docs[i].grupos = await grupos.find({ _id: { $in: user.docs[i].grupos } }).lean();
            for (let j = 0; j < user.docs[i].grupos[j].unidades.length; j++) {
              user.docs[i].grupos[j].unidades = await unidades.find({ _id: { $in: user.docs[i].grupos[j].unidades } }).lean();
            }
          }
          return res.json(user);
        }
      })
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
  }

  // GET - Método para listar um usuário por id
  static listarUsuarioPorId = async (req, res) => {
    // verificar pemissão para para fazer GET na rota /usuarios 
    try {
      // parametros para PemissaoMidleware.verificarPermissao (ROTA, METODO, REQ, RES, CALLBACK)
      return await PermissaoMidleware.verificarPermissao('usuarios:id', 'get', req, res, async () => {
        // retorno da busca desejada
        const id = req.params.id;

        // carregar o usuario pelo id e recuperar o nome do grupo
        usuarios.findById(id, async (err, usuario) => {
          if (err) {
            return res.status(400).json({ error: true, code: 400, message: "ID inválido ou não encontrado" })
          }
          if (!usuario) {
            return res.status(404).json({ code: 404, message: "Usuário não encontrado" })
          } else {
            let user = JSON.parse(JSON.stringify(usuario));
            user.grupos = await grupos.find({ _id: { $in: user.grupos } }).lean();
            for (let i = 0; i < user.grupos.length; i++) {
              user.grupos[i].unidades = await unidades.find({ _id: { $in: user.grupos[i].unidades } }).lean();
            }

            return res.status(200).send(user)
          }
        })
      })
    } catch (err) {
      // console.error(err);;
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
  }

  //PATCH - metodo para atualizar um usuario
  static atualizarUsuario = async (req, res) => {
    // verificar pemissão para para fazer PATCH na rota /usuarios 
    try {
      return await PermissaoMidleware.verificarPermissao('usuarios:id', 'patch', req, res, async () => {
        // operação desejada
        var id = req.params.id;
        var usuario = new usuarios(req.body);
        // verficar se a senha está sendo alterada 
        if (!usuario.senha) {
        } else {
          var senhaHash = await bcrypt.hash(usuario.senha, 8); // criptografar a senha
          req.body.senha = (senhaHash); // atualizar a senha do usuario com a criptografia
        }
        // atualizar o usuario
        await usuarios.findByIdAndUpdate(id, { $set: req.body }, (err) => {
          if (!err) {
            res.status(200).send({ message: 'Cadastro atualizado com sucesso' })
          } else {
            return res.status(500).json({ error: true, code: 500, message: "Erro nos dados, confira e repita" })
          }
        }).clone().catch((err) => { console.log(err) })
      })
    } catch (err) {
      //console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
  }

  //DELETE -  metodo para deletar um usuario pelo ID
  static excluirUsuario = async (req, res) => {
    // verificar pemissão para para fazer PATCH na rota /usuarios 
    try {
      return await PermissaoMidleware.verificarPermissao('usuarios:id', 'delete', req, res, async () => {
        // Validação do ID a ser excluido
        const id = ValidadorMidleware.checaId(req.params.id);
        if (!id) {
          return res.status(400).json({ error: true, code: 400, message: "ID inválido" })
        }

        // validar se o usuario é o proprio usuario logado
        if (id === req.user_id) {
          return res.status(401).json({ code: 401, message: "Usuário logado não pode excluir a si próprio!" })
        }

        // validar se o usuario que esta sendo excluido existe
        const usuario = await usuarios.findById(id);
        if (!usuario) {
          return res.status(400).json({ code: 400, message: "Usuário não localizado" })
        }
        // Excluir o usuario
        await usuarios.findByIdAndDelete(id, (err) => {
          if (!err) {
            return res.status(200).json({ error: true, code: 200, message: "Usuário excluído com sucesso." })
          }
        }).clone().catch((err) => { console.log(err) })
      })
    } catch (err) {
      //console.error(err);
      console.log('saiu do catch')
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
  }

  //POST - metodo para criar um novo usuario
  static cadastrarUsuario = async (req, res) => {
    // verificar pemissão para para fazer post na rota /usuarios 
    try {
      return await PermissaoMidleware.verificarPermissao('usuarios', 'post', req, res, async () => {
        let usuario = new usuarios(req.body); // criando um novo usuario
        // checar se usuario já existe pelo email, existino para o cadastro aqui
        let userExist = await usuarios.findOne({ email: req.body.email });
        if (userExist) {
          return res.status(400).json({ code: 400, message: "E-mail já cadastrado!" })
        }
        let senhaHash = bcrypt.hashSync(usuario.senha, 8); // criptografar a senha
        usuario.senha = senhaHash;  // atribuindo a senha criptografada ao usuario
        usuario.save((err) => {
          if (err) {
            // console.log(err);
            return res.status(500).json({ error: true, code: 500, message: "Erro nos dados, confira e repita" })
          } else {
            res.status(201).send(usuario.toJSON())
          }
        })
      })
    } catch (err) {
      // console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
  }
}

export default UsuarioController;