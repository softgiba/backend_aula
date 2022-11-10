import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const grupoSchema = new mongoose.Schema(
    {
        // id: {type: String},
        nome: { type: String, required: true, minlength: 4, maxlength: 200, trim: true },
        descricao: { type: String, required: true, minlength: 4, maxlength: 200 },
        ativo: { type: Boolean, required: true, minlength: 4, maxlength: 200 },
        unidades: [{type: mongoose.Schema.Types.ObjectId, ref: 'unidades'}], // unidade vinculada ao grupo caso deseje que o grupo seja vinculado a uma unidade
        // unidades: [
        //     { oid_unidade: { type: String, required: true, trim: true } },
        //     // { nome: { type: String, required: true, minlength: 4, maxlength: 200 } },
        //     // { email: { type: String, required: true, minlength: 4, maxlength: 200, unique: true } },
        //     // { local: { type: String, required: true, minlength: 4, maxlength: 200 } },
        //     // { ativo: { type: Boolean, required: true, minlength: 4, maxlength: 200 } }
        // ],
        rotas: [{type: mongoose.Schema.Types.ObjectId, ref: 'rotas'}], // rota vinculada ao grupo caso deseje que o grupo seja vinculado a uma rota
        
        // rotas: [
        //     { oid_rota: { type: String, required: true, trim: true } },
        //     // { nome: { type: String, required: true, minlength: 4, maxlength: 200, trim: true } },
        //     // { rota: { type: String, required: true, trim: true, unique: true } },
        //     // { verbo_get: { type: Boolean } },
        //     // { verbo_put: { type: Boolean } },
        //     // { verbo_patch: { type: Boolean } },
        //     // { verbo_delete: { type: Boolean } },
        //     // { verbo_post: { type: Boolean } },
        //     // { ativo: { type: Boolean } }
        // ]
    },
    { versionKey: false }
);

grupoSchema.plugin(mongoosePaginate);

const grupos = mongoose.model('grupos', grupoSchema);

// 
export default grupos;