import grupos from "../models/Grupo.js";
class GrupoController {
  
  static listarGrupos = async (req, res) => {
    try {
      const nome = req.query.nome;
      const unidade = req.query.unidade;
      const { page, perPage } = req.query;
      const options = { // limitar a quantidade máxima por requisição
        page: parseInt(page) || 1,
        limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10
      };
      if (!nome) {
        const grupo = await grupos.paginate({}, options);
        return res.json(grupo);
      } else {
        const grupo = await grupos.paginate({ unidades: new RegExp(unidades, 'i') }, options);
        console.log('teste');
        return res.json(grupo);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }

  static listarGrupoPorId = async (req, res) => {
    const id = req.params.id;
    await grupos.findById(id)
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
    await grupo.save((err) => {
      if (err) {
        res.status(500).send({ message: `${err.message} - falha ao cadastrar grupo.` })
      } else {
        console.log(grupo);
        console.log(grupo.toJSON());
        res.status(201).send(grupo.toJSON())
      }
    })
  }

  static atualizarGrupo = async (req, res) => {
    const id = req.params.id;
    await grupos.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Grupo atualizado com sucesso' })
      } else {
        res.status(500).send({ message: err.message })
      }
    }).clone().catch((err) => {console.log(err)})
  }

  static excluirGrupo = async (req, res) => {
    const id = req.params.id;
    await grupos.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Grupo removido com sucesso' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }


}

export default GrupoController;