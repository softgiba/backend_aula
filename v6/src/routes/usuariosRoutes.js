import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";

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
  .get("/usuarios", UsuarioController.listarUsuarios)
  .get("/usuarios/busca", UsuarioController.listarUsuarioPorNome)
  .get("/usuarios/:id", UsuarioController.listarUsuarioPorId)
  .post("/usuarios", UsuarioController.cadastrarUsuario)
  .put("/usuarios/:id", UsuarioController.atualizarUsuario)
  .delete("/usuarios/:id", UsuarioController.excluirUsuario)

/* A comment. */
export default router;