import unidades from "../models/Unidade.js";
import PermissaoMidleware from '../middlewares/PermissaoMidleware.js';
import ValidadorMidleware from '../middlewares/ValidadorMidleware.js';

class UnidadeController {

  static listarUnidades = async (req, res) => {
    try {
      return await PermissaoMidleware.verificarPermissao('unidades', 'patch', req, res, async () => {
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
          const unidade = await unidades.paginate({ nome: new RegExp(nome, 'i') }, options);
          return res.json(unidade);
        }
      })
    } catch (err) {
      //  console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
  }

  static listarUnidadePorId = async (req, res) => {
    try {
      return await PermissaoMidleware.verificarPermissao('unidades', 'get', req, res, async () => {
        const id = req.params.id;
        unidades.findById(id, (err, unidades) => {
          if (err) {
            res.status(400).send({ message: `${err.message} - Id do unidade não localizada.` })
          } else {
            res.status(200).send(unidades);
          }
        })
      })
    } catch (err) {
      // console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
  }

  static cadastrarUnidade = async (req, res) => {
    try {
      return await PermissaoMidleware.verificarPermissao('unidades', 'post', req, res, async () => {
        let unidade = new unidades(req.body);
        unidade.save((err) => {
          if (err) {
            res.status(500).send({ message: `${err.message} - falha ao cadastrar unidade.` })
          } else {
            res.status(201).send(unidade.toJSON())
          }
        })
      })
    } catch (err) {
      // console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
  }

  static atualizarUnidade = async (req, res) => {
    try {
      return await PermissaoMidleware.verificarPermissao('unidades', 'patch', req, res, async () => {
        const id = req.params.id;
        unidades.findByIdAndUpdate(id, { $set: req.body }, (err) => {
          if (!err) {
            res.status(200).send({ message: 'Unidade atualizada com sucesso' })
          } else {
            res.status(500).send({ message: err.message })
          }
        }).clone().catch((err) => { console.log(err) })
      })
    } catch (err) {
      // console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
  }

  static excluirUnidade = async (req, res) => {
    // verificar pemissão para para fazer post na rota /usuarios 
    try {
      return await PermissaoMidleware.verificarPermissao('unidades', 'delete', req, res, async () => {
        const id = req.params.id;

        // verificar se a unidade existe
        const unidadeExiste = await unidades.findById(id);
        if (!unidadeExiste) {
          return res.status(400).json({ error: true, code: 400, message: "Unidade não localizada." })
        }
        unidades.findByIdAndDelete(id, (err) => {
          if (!err) {
            res.status(200).send({ message: 'Unidade removida com sucesso' })
          } else {
            res.status(500).send({ message: err.message })
          }
        })
      })
    } catch (err) {
      // console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
  }
}

export default UnidadeController;