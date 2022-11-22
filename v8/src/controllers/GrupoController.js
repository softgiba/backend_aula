import grupos from "../models/Grupo.js";
import unidades from "../models/Unidade.js";
import rotas from "../models/Rota.js";
import PermissaoMidleware from '../middlewares/PermissaoMidleware.js';
import ValidadorMidleware from '../middlewares/ValidadorMidleware.js';

// classe para controlar operações 
class GrupoController {
  static listarGrupos = async (req, res) => {
    try {
      return await PermissaoMidleware.verificarPermissao('grupos', 'get', req, res, async () => {
        const nome = req.query.nome;
        const { page, perPage } = req.query;
        const options = { // limitar a quantidade máxima por requisição
          page: parseInt(page) || 1,
          limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 5
        };
        if (!nome) {
          let grupo = await grupos.paginate({}, options);
          let gpo = JSON.parse(JSON.stringify(grupo));

          // iterando para recuperar os dados de cada unidade cujo ID está cadastrado no grupo
          for (let i = 0; i < gpo.docs.length; i++) {
            for (let j = 0; j < gpo.docs[i].unidades.length; j++) {
              gpo.docs[i].unidades[j] = await unidades.findById(gpo.docs[i].unidades[j]);
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
      })
    } catch (err) {
      // console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
  }

  static listarGrupoPorId = async (req, res) => {
    try {
      return await PermissaoMidleware.verificarPermissao('grupos', 'get', req, res, async () => {
        const id = req.params.id;
        // carregar o grupo pelo ID e recuperar os dados de unidade
        grupos.findById(id, async (err, grupo) => {
          if (err) {
            return res.status(400).json({ error: true, code: 400, message: "ID inválido ou não encontrado" })
          }
          if (!grupo) {
            return res.status(404).json({ error: true, code: 404, message: "Grupo não encontrado" })
          }
          let gpo = JSON.parse(JSON.stringify(grupo));
          gpo.unidades = await unidades.find({ _id: { $in: gpo.unidades } }).lean();


          // for (let i = 0; i < gpo.unidades.length; i++) {
          //   gpo.unidades[i] = await unidades.findById(gpo.unidades[i]);
          // }

          
          res.status(200).send(gpo);
          /*  Rotas é gravada dentro do grupo, podendo ter configuração de acesso aos 
              verbos HTTP diferentes do cadastro das rotas, que neste caso é global. 
              Portanto se em uma rota o verbo get estiver liberado, E mas no grupo o 
              verbo get estiver bloqueado, o acesso será negado. Em casos que o verbo 
              get estiver liberado no grupo, mas bloqueado na rota, o acesso será negado, 
              por ser uma regra hierárquica de acesso maior para menor. Por isso, 
              é necessário verificar se o verbo está liberado no grupo e na rota. 
              Em caso de conflitos, prevalencendo a rota. Por essa razão não se carrega
              as configurações de acesso do cadastro das rotas, mas sim verifica-se e pelo 
              middleware de permissão e prioriza conforme a hierarquia de acesso descrita aqui.
          */
        }
        )
      })
    } catch (err) {
      // console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
  }

  static cadastrarGrupo = async (req, res) => {
    try {
      return await PermissaoMidleware.verificarPermissao('grupos', 'get', req, res, async () => {
        let grupo = new grupos(req.body);
        grupo.save((err) => {
          if (err) {
            res.status(500).send({ message: `${err.message} - falha ao cadastrar grupo.` })
          } else {
            res.status(201).send(grupo.toJSON())
          }
        })
      })
    } catch (err) {
      // console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
  }

  static atualizarGrupo = async (req, res) => {
    try {
      return await PermissaoMidleware.verificarPermissao('grupos', 'get', req, res, async () => {
        const id = req.params.id;
        await grupos.findByIdAndUpdate(id, { $set: req.body }, (err) => {
          if (!err) {
            res.status(200).send({ message: 'Grupo atualizado com sucesso' })
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

  static excluirGrupo = async (req, res) => {
    try {
      return await PermissaoMidleware.verificarPermissao('grupos', 'get', req, res, async () => {
        const id = req.params.id;
        await grupos.findByIdAndDelete(id, (err) => {
          if (!err) {
            res.status(200).send({ message: 'Grupo removido com sucesso' })
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

export default GrupoController;