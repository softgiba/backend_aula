import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";
import AuthMidleware from "../middlewares/AuthMidleware.js";

const router = express.Router();

/**
 * @swagger
 * /usuarios:
 *   get:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 * 
 */


/*
Quatro formas de Chamar o Middleware

Modo 1: router.use(AuthMidleware); // Forçando autenticação em todas as rotas da API

Modo 2: router.use(AuthMidleware {except: ["/usuarios/:id"]}); // Forçando autenticação em todas as rotas, exceto id

Modo 3: router.use(AuthMidleware {only: ["/usuarios/:id"]}); // Forçando autenticação apenas na rota id

Modo 4: Fazer como está abaixo, chamar o middleware em cada rota
        .get("/usuarios", AuthMidleware, UsuarioController.listarUsuarios)
*/

router
  .get("/usuarios", AuthMidleware, UsuarioController.listarUsuarios)
  .get("/usuarios/:id", AuthMidleware, UsuarioController.listarUsuarioPorId)
  .post("/usuarios", AuthMidleware, UsuarioController.cadastrarUsuario)
  .put("/usuarios/:id", AuthMidleware, UsuarioController.atualizarUsuario)
  .patch("/usuarios/:id", AuthMidleware, UsuarioController.atualizarUsuario)
  .delete("/usuarios/:id", AuthMidleware, UsuarioController.excluirUsuario)

/* A comment. */
export default router;