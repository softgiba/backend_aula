import grupos from "../models/Grupo.js";

class GrupoController {

  static listarGrupos = (req, res) => {
    grupos.find()
      .populate('unidade', 'nome')
      .populate('rota', 'nome')
      .exec((err, grupos) => {
          res.status(200).json(grupos)
    })
  }

  static listarGrupoPorId = (req, res) => {
    const id = req.params.id;
    grupos.findById(id)
      .populate('unidade', 'nome')
      .populate('rota', 'nome', 'rota')
      .exec((err, grupos) => {
      if (err) {
        res.status(400).send({ message: `${err.message} - Id do grupo não localizado.` })
      } else {
        res.status(200).send(grupos);
      }
    })
  }

  static cadastrarGrupo = (req, res) => {
    let grupo = new grupos(req.body);
    grupo.save((err) => {
      if (err) {
        res.status(500).send({ message: `${err.message} - falha ao cadastrar grupo.` })
      } else {
        res.status(201).send(grupo.toJSON())
      }
    })
  }

  static atualizarGrupo = (req, res) => {
    const id = req.params.id;
    grupos.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Grupo atualizado com sucesso' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }

  static excluirGrupo = (req, res) => {
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