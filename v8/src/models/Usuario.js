import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const usuarioSchema = new mongoose.Schema(
    {
        // id: {type: String},
        nome: { type: String, required: true, minlength: 4, maxlength: 200 },
        email: {
            type: String, required: true, unique: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        senha: { type: String, required: true, minlength: 4, maxlength: 200 },
        diretorio_foto: { type: String, trim: true },
        ativo: { type: Boolean, required: true, minlength: 4, maxlength: 200 },

        // unidade: [{type: mongoose.Schema.Types.ObjectId, ref: 'unidades'}], // unidade vinculada ao grupo caso deseje que o grupo seja vinculado a uma unidade
        unidades: [
            {
                _id: { type: mongoose.Schema.Types.ObjectId, ref: 'unidades' },
                nome: { type: String, required: true, minlength: 4, maxlength: 200 },
                email: { type: String, required: true, minlength: 4, maxlength: 200, unique: true },
                local: { type: String, required: true, minlength: 4, maxlength: 200 },
                ativo: { type: Boolean, required: true, minlength: 4, maxlength: 200 }
            }

        ],
        // rota: [{type: mongoose.Schema.Types.ObjectId, ref: 'rotas'}], // rota vinculada ao grupo caso deseje que o grupo seja vinculado a uma rota
        rotas: [
            {
                _id: { type: mongoose.Schema.Types.ObjectId, ref: 'rotas' },
                rota: { type: String, trim: true },
                verbo_get: { type: Boolean },
                verbo_put: { type: Boolean },
                verbo_patch: { type: Boolean },
                verbo_delete: { type: Boolean },
                verbo_post: { type: Boolean },
                ativo: { type: Boolean }
            }
        ],
        // grupo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'grupos' }]
        grupos: [
            {
                _id: { type: mongoose.Schema.Types.ObjectId, ref: 'grupos' },
                nome: { type: String, required: true, minlength: 4, maxlength: 200, trim: true },
                descricao: { type: String, required: true, minlength: 4, maxlength: 200 },
                ativo: { type: Boolean, required: true, minlength: 4, maxlength: 200 },
                rotas: [
                    {
                        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'rotas' },
                        rota: { type: String, trim: true },
                        verbo_get: { type: Boolean },
                        verbo_put: { type: Boolean },
                        verbo_patch: { type: Boolean },
                        verbo_delete: { type: Boolean },
                        verbo_post: { type: Boolean },
                        ativo: { type: Boolean }
                    }
                ],
            }
        ]
    },
    { versionKey: false }
);

usuarioSchema.plugin(mongoosePaginate);

const usuarios = mongoose.model('usuarios', usuarioSchema);

export default usuarios;