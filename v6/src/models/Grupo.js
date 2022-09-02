import mongoose from "mongoose";

const grupoSchema = new mongoose.Schema(
    {
        nome: {type: String, required: true, trim: true},
        descricao: {type: String, required: true},
        unidade: [{type: mongoose.Schema.Types.ObjectId, ref: 'unidades', required: true}],
        rota: [{type: mongoose.Schema.Types.ObjectId, ref: 'rotas', required: true}],
        ativo: {type: Boolean, required: true}
    }
);

const grupos = mongoose.model('grupos', grupoSchema);

export default grupos;