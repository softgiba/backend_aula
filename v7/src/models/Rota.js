import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const rotaSchema = new mongoose.Schema(
    {
        // id: {type: String},
        nome: { type: String, required: true, trim: true },
        rota: { type: String, required: true, trim: true, unique: true },
        verbos: [
            { verbo: String },
            { permitido: Boolean }
        ],
        ativo: { type: Boolean, required: true }
    },
    {
        versionKey: false
    }
);

rotaSchema.plugin(mongoosePaginate);

const rotas = mongoose.model('rotas', rotaSchema);

export default rotas;