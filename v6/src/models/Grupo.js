import mongoose from "mongoose";

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

const grupos = mongoose.model('grupos', grupoSchema);

export default grupos;