import unidades from "../models/Unidade.js";

class UnidadeController {

  static listarUnidades = async (req, res) => {
    try {
      const nome = req.query.nome;
      const { page, perPage } = req.query;
      const options = {
        nome: (nome),
        page: parseInt(page) || 1,
        limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10
      };
      if (!nome) {
        const unidade = await unidades.paginate({}, options);
        return res.json(unidade);
      } else {
        const unidade = await unidades.paginate({  nome: new RegExp(nome, 'i') }, options);
        return res.json(unidade);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
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
    }).clone().catch((err) => {console.log(err)})
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