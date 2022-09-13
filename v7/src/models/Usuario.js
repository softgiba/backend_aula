import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const usuarioSchema = new mongoose.Schema(
    {
        // id: {type: String},
        nome: { type: String, required: true, minlength: 4, maxlength: 200 },
        email: { type: String, required: true, minlength: 4, maxlength: 200, unique: true },
        senha: { type: String, required: true, minlength: 4, maxlength: 200 },
        diretorio_foto: { type: String, trim: true },
        ativo: { type: Boolean, required: true, minlength: 4, maxlength: 200 },

        // unidade: [{ type: mongoose.Schema.Types.ObjectId, ref: 'unidades' }],
        unidades: [
            { oid: String, required: true, trim: true },
            { nome: String },
            { local: String },
            { ativo: Boolean }
        ],
        // rota: [{ type: mongoose.Schema.Types.ObjectId, ref: 'rotas' }],
        rotas: [
            { oid: String, required: true, trim: true },
            { nome: String },
            { rota: String },
            {
                verbos: [
                    { verbo: String },
                    { permitido: Boolean }]
            }
        ],
        // grupo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'grupos' }]
        grupos: [
            { oid: String, required: true, trim: true },
            { nome: type: String, required: true, minlength: 4, maxlength: 200, trim: true },
            { descricao: type: String, required: true, minlength: 4, maxlength: 200 },
            { ativo: type: Boolean, required: true, minlength: 4, maxlength: 200 },
            {
                rotas: [
                    { oid: String, required: true, trim: true },
                    { nome: String },
                    { rota: String },
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