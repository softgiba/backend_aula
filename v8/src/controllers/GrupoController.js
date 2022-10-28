import grupos from "../models/Grupo.js";
import unidades from "../models/Unidade.js";
import rotas from "../models/Rota.js";

class GrupoController {

  static listarGrupos = async (req, res) => {
    try {
      const nome = req.query.nome;
      const { page, perPage } = req.query;
      const options = { // limitar a quantidade máxima por requisição
        page: parseInt(page) || 1,
        limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 5
      };
      if (!nome) {
        let grupo = await grupos.paginate({}, options);
        let gpo = JSON.parse(JSON.stringify(grupo));

        console.log(grupo);
        console.log(gpo.docs);
        // iterando para recuperar os dados de cada unidade cujo ID está cadastrado no grupo
        for (let i = 0; i < gpo.docs.length; i++) {
          for (let j = 0; j < gpo.docs[i].unidades; j++) {
            gpo.docs[i].unidades[j] = await unidades.findById(gpo.docs[i].unidades[j]);
          }
        }
        // iterando para recuperar os dados de cada rota cujo ID está cadastrado no grupo
        for (let i = 0; i < gpo.docs.length; i++) {
          for (let j = 0; j < gpo.docs[i].rotas.length; j++) {
            gpo.docs[i].rotas[j] = await rotas.findById(gpo.docs[i].rotas[j]);
          }
        }
        res.status(200).send(gpo);

        //--------------------------------------------------------------------------------
      } else {
        const grupo = await grupos.paginate({ nome: new RegExp(nome, 'i') }, options);
        let gpo = JSON.parse(JSON.stringify(grupo));

        for (let i = 0; i < gpo.docs.length; i++) {
          for (let j = 0; j < gpo.docs[i].unidades.length; j++) {
            gpo.docs[i].unidades[j] = await unidades.findById(gpo.docs[i].unidades[j]);
          }
        }
        res.status(200).send(gpo);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }

  static listarGrupoPorId = async (req, res) => {
    const id = req.params.id;
    await grupos.findById(id, (err, grupos) => {
      unidades.findById(grupos.unidades, (err, unidade) => {
        if (!err) {
          for (let i = 0; i < grupos.unidades.length; i++) {
            grupos.unidades[i] = unidade;
          }
          res.status(200).send(grupos);
        } else {
          res.status(400).send({ message: `${err.message} - Id do grupo não localizado.` })
        }
      })
    }).lean().clone().catch((err) => { console.log(err) })
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
    await grupos.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Grupo atualizado com sucesso' })
      } else {
        res.status(500).send({ message: err.message })
      }
    }).clone().catch((err) => { console.log(err) })
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