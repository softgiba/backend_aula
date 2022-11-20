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
        Verbo_put: { type: Boolean },
        verbo_patch: { type: Boolean },
        verbo_delete: { type: Boolean },
        verbo_post: { type: Boolean }
    },
    {
        versionKey: false
    }
);


// metodo para atualizar os grupos conforme muda o status de cada verbo da rota
rotaSchema.pre('save', async function (next) {
    const rota = this;
    const grupos = await Grupo.find({ 'rotas._id': rota._id });
    grupos.forEach(async grupo => {
        grupo.rotas.forEach(async (rotaGrupo, index) => {
            if (rotaGrupo._id.toString() === rota._id.toString()) {
                grupo.rotas[index].ativo = rota.ativo;
                grupo.rotas[index].verbo_get = rota.verbo_get;
                grupo.rotas[index].verbo_put = rota.verbo_put;
                grupo.rotas[index].verbo_patch = rota.verbo_patch;
                grupo.rotas[index].verbo_delete = rota.verbo_delete;
                grupo.rotas[index].verbo_post = rota.verbo_post;
                await grupo.save();
            }
        });
    });
    next();
});



rotaSchema.plugin(mongoosePaginate);

const rotas = mongoose.model('rotas', rotaSchema);

export default rotas;