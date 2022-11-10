import jwt from 'jsonwebtoken';
import config from '../config/auth.js';
import { promisify } from 'util';

const authMiddleware = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(498).json({code: 498, message: "O token de autenticação não existe!" })
  }

  const [, token] = auth.split(' '); // desestruturação

  try {
    // promisify converte uma função de callback para uma função async/await
    const decoded = await promisify(jwt.verify)(token, config.secret);

    if (!decoded) { // se não ocorrer a decodificação do token
      return res.status(498).json({ error: true, code: 498, message: "O token está expirado!" })
    } else { // se o token for válido
      req.user_id = decoded.id;
      next();
    }

  } catch { // se o token não for válido
    return res.status(498).json({ error: true, code: 498, message: "O token está inválido!" })
  }

}
export default authMiddleware;