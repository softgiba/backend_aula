import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

import Atendimento from './Atendimento.js';
import Pessoa from './Pessoa.js';
import Rota from './Rota.js';
import Usuario from './Usuario_old.js';


export default { Atendimento, Pessoa, Rota, Usuario };