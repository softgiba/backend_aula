import pessoas from "../models/Pessoa.js";
import { body, validationResult } from "express-validator";
class PessoaController {

  // atualizar pessoa por _id (update)
  static atualizarPessoa = async (req, res) => {
    const id = req.params.id;
    await pessoas.updateOne({ _id: id }, { $set: req.body }, (err) => {
      if (!err) {
        return res.status(200).json({ code: 200, message: "Operação bem sucedida" })
      } else {
        return res.status(500).json({error: true,  code: 500, message: "Erro no processo, confira os dados e repita" })
      }
    })
  }

  // Cadastrar pessoa POST
  static cadastrarPessoa = [
    body('nome').isLength({ min: 3 }).withMessage('O nome é de preenchimento obrigatório.'),
    async (req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // retorna os erros de validação
        return res.status(400).json({ errors: errors.array() });
      }
      let pessoa = new pessoas(req.body);
      await pessoa.save((err) => {
        if (err) {
          return res.status(500).json({error: true,  code: 500, message: "Erro no processo, confira os dados e repita" })
        } else {
          res.status(201).send(pessoa.toJSON())
        }
      })
    }
  ]

  // Listar pessoas todos os pessoas || por nome || por cpf 
  static listarPessoas = async (req, res) => {
    try {
      const cpf = req.query.cpf;
      const nome = req.query.nome;
      const page = req.query.page;
      let perPage = req.query.perPage;

      const options = { // limitar a quantidade máxima por requisição
        page: parseInt(page) || 1,
        limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10
      }

      if (!cpf && !nome) {
        const pessoa = await pessoas.paginate({}, options);
        return res.json(pessoa);
      } if (!nome) {
        const pessoa = await pessoas.paginate({ cpf: new RegExp(cpf, 'i') }, options);
        return res.json(pessoa);
      } else {
        const pessoa = await pessoas.paginate({ nome: new RegExp(nome, 'i') }, options);
        return res.json(pessoa);
      }
    } catch (err) {
      // console.error(err);
       return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
  }

}

export default PessoaController;
