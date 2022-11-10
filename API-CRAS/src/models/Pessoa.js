import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const pessoaSchema = new mongoose.Schema(
    {
        nome: { type: String, maxlength: 200, trim: true },
        cpf: { type: String, maxlength: 14, trim: true },
        dataNascimento: { type: Date},
        estrangeiro: { type: Boolean, required: true, default: false },
        pais: { type: String, trim: true  },
        cep: { type: String, trim: true },
        logradouro: { type: String, trim: true  },
        numero: { type: String, trim: true  },
        bairro: { type: String , trim: true },
        cidade: { type: String, trim: true  },
        estado: { type: String , trim: true },
        telefone: { type: String , trim: true },
        telefoneContato: { type: String, trim: true }
    },
    { versionKey: false }
);

pessoaSchema.plugin(mongoosePaginate);

const pessoas = mongoose.model('pessoas', pessoaSchema);

export default pessoas;
