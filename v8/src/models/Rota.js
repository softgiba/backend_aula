import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';
import Grupo from './Grupo.js';

/* ativar os verbos de acordo com a existência de metodos no controller, 
o acesso a rota será permitido apenas se o verbo estiver ativo, 
mas a autorizaçã será controlada pelo dado que o usuario tem no seu proprio cadastro 
ou pelo grupo que ele pertence
*/
const rotaSchema = new mongoose.Schema(
    {
        rota: { type: String, required: true, trim: true, unique: true },
        ativo: { type: Boolean },
        verbo_get: { type: Boolean },
        verbo_put: { type: Boolean },
        verbo_patch: { type: Boolean },
        verbo_delete: { type: Boolean },
        verbo_post: { type: Boolean }
    },
    {
        versionKey: false
    }
);

rotaSchema.plugin(mongoosePaginate);

const rotas = mongoose.model('rotas', rotaSchema);

export default rotas;