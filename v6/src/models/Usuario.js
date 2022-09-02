import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        usuario: {type: String, required: true, trim: true},
        senha: {type: String, required: true},
        diretorio_foto: {type: String, trim: true},
        ativo: {type: Boolean, required: true},

        unidade: [{type: mongoose.Schema.Types.ObjectId, ref: 'unidades'}],
        rota: [{type: mongoose.Schema.Types.ObjectId, ref: 'rotas'}],
        grupo: [{type: mongoose.Schema.Types.ObjectId, ref: 'grupos'}]
    }
);

const usuarios = mongoose.model('usuarios', usuarioSchema);

export default usuarios;