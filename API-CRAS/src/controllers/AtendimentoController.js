import atendimentos from "../models/Atendimento.js";
import { body, validationResult } from "express-validator";

class AtendimentoController {

  // PUT /atendimentos por _id (update) 
  static atualizarAtendimento = async (req, res) => {
    try {
      const id = req.params.id;
      await atendimentos.updateOne({ _id: id }, { $set: req.body }, (err) => {
        if (!err) {
          return res.status(200).json({ error: true, code: 200, message: "Operação bem sucedida" })
        } else {
          return res.status(500).json({ error: true, code: 500, message: "Erro no processo, confira os dados e repita" })
        }
      })
    }
    catch (err) {
      // console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
  }


  // POST atendimentos
  static cadastrarAtendimento = [
    body('oid_pessoa').isLength({ min: 3 }).withMessage('O oid_pessoa é de preenchimento obrigatório.'),
    body('tipo').isLength({ min: 3 }).withMessage('O tipo é de preenchimento obrigatório.'),
    body('observacao').isLength({ min: 3 }).withMessage('O observação é de preenchimento obrigatório.'),
    (req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      atendimentos.save((err) => {
        if (err) {
          return res.status(500).json({ error: true, code: 500, message: "Erro no processo, confira os dados e repita" })
        } else {
          res.status(201).send(atendimentos.toJSON())
        }
      })
    }
  ]

  // // Listar atendimentos todos os atendimentos || por tipo de atendimento || por oid de uma pessoa || data incial e final
  static listarAtendimentos = async (req, res) => {
    try {
      const { oid_pessoa, tipo, dataAtendimento, dataAtendimentoFinal } = req.query;

      const page = req.query.page;
      let perPage = req.query.perPage;

      const options = { // limitar a quantidade máxima por requisição
        page: parseInt(page) || 1,
        limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10
      }

      // buscar tudo por falta de parametro na requisição
      if (!dataAtendimento && !tipo && !oid_pessoa && !tipo) {
        const atendimento = await atendimentos.paginate({}, options);
        return res.json(atendimento);
      }

      // buscar por tipo de atendimento
      if (!dataAtendimento && !oid_pessoa) {
        const atendimento = await atendimentos.paginate({ tipo: new RegExp(tipo, 'i') }, options);
        return res.json(atendimento);
      }

      // buscar por oid_pessoa atendida
      if (!dataAtendimento && !tipo) {
        const atendimento = await atendimentos.paginate({ oid_pessoa: oid_pessoa }, options);
        return res.json(atendimento);
      } else {

        // buscar por um periodo inicial e data final de atendimento (dataAtendimento) 
        const atendimento = await atendimentos.paginate({ dataAtendimento: { $gte: dataAtendimento, $lte: dataAtendimentoFinal } }, options);
        return res.json(atendimento);
      }
    } catch (err) {
      // console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
  }

}

export default AtendimentoController;