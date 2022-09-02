import rotas from "../models/Rota.js";

class RotaController {
  
  static listarRotas = (req, res) => {
    rotas.find((err, rotas) => {
      res.status(200).json(rotas)
      if (err) {
        res.status(404).send({ message: `${err.message} - falha ao carregar dados da rota.` })
      } else {
        res.status(200).json(rotas)
      }
    })
  }

  static listarRotaPorId = (req, res) => {
    const id = req.params.id;
    rotas.findById(id).exec((err, rotas) => {
      if (err) {
        res.status(400).send({ message: `${err.message} - Id do rota não localizada.` })
      } else {
        res.status(200).send(rotas);
      }
    })
  }

  static cadastrarRota = (req, res) => {
    let rota = new rotas(req.body);
    rota.save((err) => {
      if (err) {
        res.status(500).send({ message: `${err.message} - falha ao cadastrar rota.` })
      } else {
        res.status(201).send(rota.toJSON())
      }
    })
  }

  static atualizarRota = (req, res) => {
    const id = req.params.id;

    rotas.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Rota atualizada com sucesso' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }

  static excluirRota = (req, res) => {
    const id = req.params.id;

    rotas.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Rota removida com sucesso' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }

}

export default RotaController;