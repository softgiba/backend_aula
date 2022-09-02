import mongoose from "mongoose";

const rotaSchema = new mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String, required: true},
        rota: {type: String, required: true},
        verbos: ['verbo', {type : String}],
        ativo: {type: Boolean, required: true}
    }
);

const rotas = mongoose.model('rotas', rotaSchema);

export default rotas;