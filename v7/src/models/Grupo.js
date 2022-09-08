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
            { oid: ObjectId, required: true },
            { nome: String, required: true },
            { local: String, required: true },
            { ativo: Boolean, required: true }
        ],
        // rota: [{type: mongoose.Schema.Types.ObjectId, ref: 'rotas'}],
        rotas: [
            { oid: ObjectId, required: true },
            { nome: String, required: true, trim: true },
            { rota: String, required: true, trim: true, unique: true },
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