import mongoose from "mongoose";

const unidadeSchema = new mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String, required: true},
        local: {type: String, required: true},
        ativo: {type: Boolean, required: true}
    },
    {
        versionKey: false
    }
);

const unidades = mongoose.model('unidades', unidadeSchema);

export default unidades;