import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const grupoSchema = new mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String, required: true, trim: true},
        descricao: {type: String, required: true},
        unidade: [{type: mongoose.Schema.Types.ObjectId, ref: 'unidades'}],
        rota: [{type: mongoose.Schema.Types.ObjectId, ref: 'rotas'}],
        usuario: [{type: mongoose.Schema.Types.ObjectId, ref: 'usuarios'}],
        ativo: {type: Boolean, required: true}
    }
);

grupoSchema.plugin(mongoosePaginate);

const grupos = mongoose.model('grupos', grupoSchema);

export default grupos;