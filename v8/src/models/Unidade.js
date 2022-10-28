import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const unidadeSchema = new mongoose.Schema(
    {
        nome: { type: String, required: true, minlength: 4, maxlength: 200 },
        email: { type: String, required: true, minlength: 4, maxlength: 200, unique: true },
        local: { type: String, required: true, minlength: 4, maxlength: 200 },
        ativo: { type: Boolean, required: true, minlength: 4, maxlength: 200 }
    },
    {
        versionKey: false
    }
);

unidadeSchema.plugin(mongoosePaginate);

const unidades = mongoose.model('unidades', unidadeSchema);

export default unidades;