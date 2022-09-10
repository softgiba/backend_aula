import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const unidadeSchema = new mongoose.Schema(
    {
        // id: {type: String},
        nome: {type: String, required: true},
        local: {type: String, required: true},
        ativo: {type: Boolean, required: true}
    },
    {
        versionKey: false
    }
);

unidadeSchema.plugin(mongoosePaginate);

const unidades = mongoose.model('unidades', unidadeSchema);

export default unidades;