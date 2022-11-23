import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, minlength: 4, maxlength: 200, required: [true, 'Nome é obrigatório.'] },
    email: {
        type: String, required: true, unique: true, lowercase: true, trim: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    senha: { type: String, minlength: 8, trim: true, required: true, select: false },
    link_foto: { type: String, trim: true },
    ativo: { type: Boolean, required: true, minlength: 4, maxlength: 200, default: false },

    // registrar cada rota e sua configuração, pois o usuário terá acesso personalizado para cada rota
    rotas: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'rotas' },
            rota: { type: String, required: true, trim: true },
            ativo: { type: Boolean },
            verbo_get: { type: Boolean },
            verbo_put: { type: Boolean },
            verbo_patch: { type: Boolean },
            verbo_delete: { type: Boolean },
            verbo_post: { type: Boolean }
        }
    ],

    //registrar só este dados básicos do grupo, o usuário herdará as permissões do grupo
    grupos: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'grupos' }
        }
    ]
},
    { versionKey: false }
);

usuarioSchema.plugin(mongoosePaginate);

const usuarios = mongoose.model('usuarios', usuarioSchema);

export default usuarios;