import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
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

router
  .get("/usuarios", AuthMiddleware, UsuarioController.listarUsuarios)
  .get("/usuarios/:id", AuthMiddleware, UsuarioController.listarUsuarioPorId)
  .post("/usuarios", AuthMiddleware, UsuarioController.cadastrarUsuario)
  .put("/usuarios/:id", AuthMiddleware, UsuarioController.atualizarUsuario)
  .patch("/usuarios/:id", AuthMiddleware, UsuarioController.atualizarUsuario)
  .delete("/usuarios/:id", AuthMiddleware, UsuarioController.excluirUsuario)

/* A comment. */
export default router;