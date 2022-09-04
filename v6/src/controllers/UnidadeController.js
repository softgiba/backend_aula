import unidades from "../models/Unidade.js";

class UnidadeController {

  static listarUnidades = async (req, res) => {
    unidades.find((err, unidades) => {
      // res.status(200).json(unidades)

      if (err) {
        res.status(404).send({ message: `${err.message} - falha ao carregar dados da unidade.` })
      } else {
        res.status(200).json(unidades)
      }
    })
  }

  static listarUnidadesPorNome = async (req, res) => {
    const nome = req.query.nome
    unidades.find({'nome': nome}, {}, (err, unidades) => {
      if (err) {
        res.status(400).send({ message: `${err.message} - Não encontrado.` })
      } else {
        res.status(200).send(unidades);
      }
    })
  }

  static listarUnidadePorId = async (req, res) => {
    const id = req.params.id;

    unidades.findById(id, (err, unidades) => {
      if (err) {
        res.status(400).send({ message: `${err.message} - Id do unidade não localizada.` })
      } else {
        res.status(200).send(unidades);
      }
    })
  }

  static cadastrarUnidade = async (req, res) => {
    let unidade = new unidades(req.body);
    unidade.save((err) => {
      if (err) {
        res.status(500).send({ message: `${err.message} - falha ao cadastrar unidade.` })
      } else {
        res.status(201).send(unidade.toJSON())
      }
    })
  }

  static atualizarUnidade = async (req, res) => {
    const id = req.params.id;

    unidades.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Unidade atualizada com sucesso' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }

  static excluirUnidade = async (req, res) => {
    const id = req.params.id;

    unidades.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Unidade removida com sucesso' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }

}

export default UnidadeController;