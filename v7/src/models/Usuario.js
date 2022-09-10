import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const usuarioSchema = new mongoose.Schema(
    {
        // id: {type: String},
        nome: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        senha: { type: String, required: true },
        diretorio_foto: { type: String, trim: true },
        ativo: { type: Boolean, required: true },

        // unidade: [{ type: mongoose.Schema.Types.ObjectId, ref: 'unidades' }],
        unidades: [
            { oid: String },
            { nome: String },
            { local: String },
            { ativo: Boolean }
        ],
        // rota: [{ type: mongoose.Schema.Types.ObjectId, ref: 'rotas' }],
        rotas: [
            { oid: String},
            { nome: String},
            { rota: String},
            {
                verbos: [
                    { verbo: String },
                    { permitido: Boolean }]
            }
        ],
        // grupo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'grupos' }]
        grupos: [
            { oid: String},
            { nome: String},
            { descricao: String},
            { ativo: Boolean},
            {
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
            }
        ]
    },
    { versionKey: false }
);

usuarioSchema.plugin(mongoosePaginate);

const usuarios = mongoose.model('usuarios', usuarioSchema);

export default usuarios;