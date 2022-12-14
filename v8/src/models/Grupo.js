import mongoose from "mongoose";
import Unidade from "./Unidade.js"; 
import mongoosePaginate from 'mongoose-paginate';

const grupoSchema = new mongoose.Schema(
    {
        // id: {type: String},
        nome: { type: String, required: true, minlength: 4, maxlength: 200, trim: true },
        descricao: { type: String, required: true, minlength: 4, maxlength: 200 },
        ativo: { type: Boolean, required: true, minlength: 4, maxlength: 200 },
        unidades: [
            {
                _id: { type: mongoose.Schema.Types.ObjectId, ref: 'grupos' }
            }
        ],
        rotas: [
            {
                _id: { type: mongoose.Schema.Types.ObjectId, ref: 'rotas' },
                rota: { type: String, required: true, trim: true },
                ativo: { type: Boolean },
                verbo_get: { type: Boolean },
                verbo_put: { type: Boolean },
                verbo_patch: { type: Boolean },
                verbo_delete: { type: Boolean },
                verbo_post: { type: Boolean }
            }
        ]
    },
    { versionKey: false }
);

grupoSchema.plugin(mongoosePaginate);

const grupos = mongoose.model('grupos', grupoSchema);


// método para devolver as unidades do grupo
grupoSchema.methods.getUnidades = async function () {
    const grupo = this;
    const unidades = await Unidade.find({ _id: { $in: grupo.unidades } });
    return unidades;
}

export default grupos;