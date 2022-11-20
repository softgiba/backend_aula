import User from '../models/Usuario.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class LoginController {

  static logar = async (req, res) => {
    const { email, senha } = req.body;

    const userExist = await User.findOne({ email }).select('+senha');

    // se o usuário não existir
    if (!userExist) {
      return res.status(400).json({ code: 400, message: "Usuário inexistente!" })
    }

    // se a senha não bater
    if (!(await bcrypt.compare(senha, userExist.senha))) {
      return res.status(400).json({ code: 400, message: "Senha inválida!" })
    }

    // se o usuário não estiver ativo
    if (!userExist.ativo) {
      return res.status(400).json({ code: 400, message: "Usuário inativo!" })
    }

    return res.status(200).json({
      user: {
        id: userExist._id,
        nome: userExist.nome,
        email: userExist.email,
        ativo: userExist.ativo
        // rotas: userExist.rotas
      },
      token: jwt.sign(
        { id: userExist._id },
        process.env.SECRET,
        { expiresIn: process.env.EXPIREIN}
      )
    })
  }
}

export default LoginController;