import usuario from "../models/Usuario.js";

class UsuarioController {

  static listarUsuarios = async (req, res) => {
    usuarios.find()
      .populate('unidade', ['nome', 'descricao', 'ativo'])
      .populate('grupo', ['nome', 'ativo'])
      .populate('rota', ['rota', 'verbos', 'ativo'])
      .populate({ path: 'rota', select: 'nome'})
      .populate('grupo', 'nome')
      .exec((err, usuarios) => {
          res.status(200).json(usuarios)
    })
  }


  static listarUsuariosPorNome = async (req, res) => {
    const nome = req.query.nome
    usuarios.find({'nome': nome}, {}, (err, usuarios) => {
      if (err) {
        res.status(400).send({ message: `${err.message} - Não encontrado.` })
      } else {
        res.status(200).send(usuarios);
      }
    })
  }

  static listarUsuarioPorId = async (req, res) => {
    const id = req.params.id;
    usuarios.findById(id)
    .populate('unidade', ['nome', 'descricao', 'ativo'])
    .populate('grupo', ['nome', 'ativo'])
    .populate('rota', ['rota', 'verbos', 'ativo'])
      .exec((err, usuarios) => {
      if (err) {
        res.status(400).send({ message: `${err.message} - Id do usuario não localizado.` })
      } else {
        res.status(200).send(usuarios);
      }
    })
  }

  static cadastrarUsuario = async (req, res) => {
    let usuario = new usuarios(req.body);
    usuario.save((err) => {
      if (err) {
        res.status(500).send({ message: `${err.message} - falha ao cadastrar usuario.` })
      } else {
        res.status(201).send(usuario.toJSON())
      }
    })
  }

  static atualizarUsuario = async (req, res) => {
    const id = req.params.id;
    usuarios.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Usuario atualizado com sucesso' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }

  static excluirUsuario = async (req, res) => {
    const id = req.params.id;
    usuarios.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Usuario removido com sucesso' })
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