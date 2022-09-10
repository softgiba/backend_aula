import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const grupoSchema = new mongoose.Schema(
    {
        // id: {type: String},
        nome: { type: String, required: true, trim: true },
        descricao: { type: String, required: true },
        ativo: { type: Boolean, required: true },
        // unidade: [{type: mongoose.Schema.Types.ObjectId, ref: 'unidades'}],
        unidades: [
            { oid: String},
            { nome: String},
            { local: String},
            { ativo: Boolean}
        ],
        // rota: [{type: mongoose.Schema.Types.ObjectId, ref: 'rotas'}],
        rotas: [
            { oid: String},
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

export default grupos;