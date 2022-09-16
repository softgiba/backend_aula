import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const rotaSchema = new mongoose.Schema(
    {
        // id: {type: String},
        nome: { type: String, required: true, minlength: 4, maxlength: 200, trim: true },
        rota: { type: String, required: true, minlength: 4, maxlength: 200, trim: true, unique: true },
        verbos: [
            { verbo: { type: String }},
            { permitido: { type: Boolean }}
        ],
        ativo: { type: Boolean, required: true, minlength: 4, maxlength: 200 }
    },
    {
        versionKey: false
    }
);

rotaSchema.plugin(mongoosePaginate);

const rotas = mongoose.model('rotas', rotaSchema);

export default rotas;