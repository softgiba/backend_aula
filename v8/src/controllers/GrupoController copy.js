import grupos from "../models/Grupo.js";
import unidades from "../models/Unidade.js";
// import unidade from "../models/Unidade.js";


class GrupoController {

  static listarGrupos = async (req, res) => {
    try {
      const nome = req.query.nome;
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

    /*
    https://mongoosejs.com/docs/api/query.html#query_Query-lean
    Query.prototype.lean()

    Sets the lean option.
    Documents returned from queries with the lean option enabled are plain javascript objects, 
    not Mongoose Documents. They have no save method, getters/setters, virtuals, or other 
    Mongoose features.
    */
    // Com o lean(), o documento grupo é um objeto normal
    let grupo = await grupos.findById(id).lean();
    
    //grupo = grupo.toObject();

    // re-criar o objeto 
    //let grupo = {...grupo_res};
    //grupo = grupo._doc;

    // re-criar o objeto
    //let grupo = JSON.parse(JSON.stringify(grupo_res));

    //console.log(grupo);

    //res.status(200).send("OK");
    /*
    * (err, grupos) => {
    * }).clone().catch((err) => { console.log(err) })
    * */
    

    const err = false;

    if (!err) {
      let unidade = []
      for (let i = 0; i < grupo.unidades.length; i++) {
        const t = await unidades.findById(grupo.unidades[i]);
        unidade.push(t);
      }
        
      grupo.ativo = true;
      console.log(unidade);
      grupo.unidades = unidade;

        // var products = [];
        // products.push({"nome":"Sérgio", "idade":23, "profissao":"programador angularjs"})
        
        // console.log(products);
        
        
        
        res.status(200).send(grupo);
        // sair no console o json com os dados de reposta do método GET
        console.log("GRUPOS:")
        console.log(grupo); 
        
    } else {
      res.status(400).send({ message: `${err.message} - Id do grupo não localizado.` })
    }
    
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