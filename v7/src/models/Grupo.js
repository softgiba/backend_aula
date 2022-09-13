import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const grupoSchema = new mongoose.Schema(
    {
        // id: {type: String},
        nome: { type: String, required: true, minlength: 4, maxlength: 200, trim: true },
        descricao: { type: String, required: true, minlength: 4, maxlength: 200 },
        ativo: { type: Boolean, required: true, minlength: 4, maxlength: 200 },
        // unidade: [{type: mongoose.Schema.Types.ObjectId, ref: 'unidades'}],
        unidades: [
            { oid: String, required: true, trim: true },
            { nome: String},
            { local: String},
            { ativo: Boolean}
        ],
        // rota: [{type: mongoose.Schema.Types.ObjectId, ref: 'rotas'}],
        rotas: [
            { oid: String, required: true, trim: true },
            { nome: String},
            { rota: String},
            {
                verbos: [
                    { verbo: String },
                    { permitido: Boolean }]
            }
        ]
    },
    { versionKey: false }
);

grupoSchema.plugin(mongoosePaginate);

const grupos = mongoose.model('grupos', grupoSchema);

// 
export default grupos;