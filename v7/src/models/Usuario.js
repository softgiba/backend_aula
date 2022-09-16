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
            { oid: { type: String, required: true, trim: true }},
            { nome: { type: String }},
            { local: { type: String }},
            { ativo: { type: Boolean }}
        ],
        // rota: [{ type: mongoose.Schema.Types.ObjectId, ref: 'rotas' }],
        rotas: [
            { oid: { type: String, required: true, trim: true }},
            { nome: { type: String }},
            { rota: { type: String }},
            {
                verbos: [
                    { verbo: String },
                    { permitido: Boolean }]
            }
        ],
        // grupo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'grupos' }]
        grupos: [
            { oid: { type: String, required: true, trim: true } },
            { nome: { type: String, required: true, minlength: 4, maxlength: 200, trim: true } },
            { descricao: { type: String, required: true, minlength: 4, maxlength: 200 } },
            { ativo: { type: Boolean, required: true, minlength: 4, maxlength: 200 } },
            {
                rotas: [
                    { oid: { type: String, required: true, trim: true } },
                    { nome: { type: String } },
                    { rota: { type: String } },
                    {
                        verbos: [
                            { verbo: { type: String }},
                            { permitido: { type: Boolean } }
                        ]
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