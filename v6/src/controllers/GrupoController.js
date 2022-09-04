import grupos from "../models/Grupo.js";

class GrupoController {

  static listarGrupos = async function (req, res) {

    if (!req.query.nome && !req.query.page && !req.query.limit && !req.query.skip) {
      if (!req.query.nome && !req.query.page && !req.query.limit && !req.query.skip) {
        await grupos.find().sort({ nome: 1 })
          .populate('unidade', ['nome', 'descricao', 'ativo'])
          .populate('usuario', ['nome', 'email', 'ativo'])
          .populate('rota', ['rota', 'verbos', 'ativo'])
          .exec((err, grupos) => {
            res.status(200).json(grupos);
          });
      }
    } else {
      if (!req.query.nome || !req.query.page || !req.query.limit || !req.query.skip) {
        res.status(400).send({ message: `Nome: ${req.query.nome} + page: ${req.query.page} +  limit: ${req.query.limit} +  skip: ${req.query.skip} +  Não encontrado, parâmentros insuficientes.` })
      } else {
        if (req.query.nome && req.query.page && req.query.limit && req.query.skip) {
          const { nome, page, limit } = req.query;
          if (!page) page = 1;
          if (!limit) limit = 10;
          const skip = (page - 1) * limit;

          await grupos.find({ 'nome': nome }).skip(skip).limit(limit).sort({ nome: 1 })
            .populate('unidade', ['nome', 'descricao', 'ativo'])
            .populate('usuario', ['nome', 'email', 'ativo'])
            .populate('rota', ['rota', 'verbos', 'ativo'])
            .exec((err, grupos) => {
              res.status(200).json(grupos);
            });
        }
      }
    }
  }

  static listarGruposPorNome = async (req, res) => {
    const nome = await req.query.nome
    grupos.find({ 'nome': nome }, {}, (err, grupos) => {
      if (console.error()) {
        res.status(400).send({ message: `${err.message} - Não encontrado.` })
      } else {
        res.status(200).send(grupos);
      }
    }).sort({ nome: 1 })
  }

  static listarGrupoPorId = async (req, res) => {
    const id = req.params.id;
    grupos.findById(id)
      .populate('unidade', ['nome', 'descricao', 'ativo'])
      .populate('usuario', ['nome', 'email', 'ativo'])
      .populate('rota', ['rota', 'verbos', 'ativo'])
      .exec((err, grupos) => {
        if (err) {
          res.status(400).send({ message: `${err.message} - Id do grupo não localizado.` })
        } else {
          res.status(200).send(grupos);
        }
      })
  }

  static cadastrarGrupo = async (req, res) => {
    let grupo = new grupos(req.body);
    grupo.save((err) => {
      if (err) {
        res.status(500).send({ message: `${err.message} - falha ao cadastrar grupo.` })
      } else {
        res.status(201).send(grupo.toJSON())
      }
    })
  }

  static atualizarGrupo = async (req, res) => {
    const id = req.params.id;
    grupos.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Grupo atualizado com sucesso' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }

  static excluirGrupo = async (req, res) => {
    const id = req.params.id;
    grupos.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Grupo removido com sucesso' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }

}

export default GrupoController;