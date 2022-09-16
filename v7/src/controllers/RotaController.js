import rotas from "../models/Rota.js";

class RotaController {
  static listarRotas = async (req, res) => {
    try {
      const nome = req.query.nome;
      const { page, perPage } = req.query;
      const options = { // limitar a quantidade máxima por requisição
        nome: (nome),
        page: parseInt(page) || 1,
        limit: parseInt(perPage) > 10 ? perPage = 10 : perPage = parseInt(perPage) || 10
      };
      if (!nome) {
        const rota = await rotas.paginate({}, options);
        return res.json(rota);
      } else {
        const rota = await rotas.paginate({ nome }, options);
        return res.json(rota);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }


  static listarRotaPorId = async (req, res) => {
    const id = req.params.id;
    await rotas.findById(id)
      .exec((err, rotas) => {
        if (err) {
          res.status(400).send({ message: `${err.message} - Id do rota não localizado.` })
        } else {
          res.status(200).send(rotas);
        }
      })
  }


  static cadastrarRota = async (req, res) => {
    let rota = new rotas(req.body);
    await rota.save((err) => {
      if (err) {
        res.status(500).send({ message: `${err.message} - falha ao cadastrar rota.` })
      } else {
        res.status(201).send(rota.toJSON())
      }
    })
  }

  static atualizarRota = async (req, res) => {
    const id = req.params.id;
    await rotas.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Rota atualizada com sucesso' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }

  static excluirRota = async (req, res) => {
    const id = req.params.id;
    await rotas.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Rota removida com sucesso' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }

}

export default RotaController;