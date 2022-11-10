import usuarios from "../models/Usuario.js";

class UsuarioController {

  static listarUsuarios = async (req, res) => {
    try {
      const nome = req.query.nome;
      const { page, perPage } = req.query;
      const options = { // limitar a quantidade máxima por requisição
        nome: (nome),
        page: parseInt(page) || 1,
        limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10
      };
      if (!nome) {
        const usuario = await usuarios.paginate({}, options);
        return res.json(usuario);
      } else {
        const usuario = await usuarios.paginate({  nome: new RegExp(nome, 'i')  }, options);
        return res.json(usuario);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }

  static listarUsuarioPorId = async (req, res) => {
    const id = req.params.id;
    await usuarios.findById(id)
      .exec((err, usuarios) => {
        if (err) {
          res.status(400).send({ message: `${err.message} - Id do rota não localizado.` })
        } else {
          res.status(200).send(usuarios);
        }
      })
  }

  static cadastrarUsuario = async (req, res) => {
    let usuarios = new usuarios(req.body);
    usuarios.save((err) => {
      if (err) {
        res.status(500).send({ message: `${err.message} - falha ao cadastrar usuário.` })
      } else {
        res.status(201).send(usuarios.toJSON())
      }
    })
  }

  static atualizarUsuario = async (req, res) => {
    const id = req.params.id;
    usuarios.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Usuário atualizado com sucesso' })
      } else {
        res.status(500).send({ message: err.message })
      }
    }).clone().catch((err) => {console.log(err)})
  }

  
  static excluirUsuario = async (req, res) => {
    const id = req.params.id;
    usuarios.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Usuário removido com sucesso' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }

  static listarUsuarioPorNome = async (req, res) => {
    const nome = req.query.nome
    usuarios.find({'nome': nome}, {}, (err, usuarios) => {
      res.status(200).send(usuarios);
    });

  }

}

export default UsuarioController;