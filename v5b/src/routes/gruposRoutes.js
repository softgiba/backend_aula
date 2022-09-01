import express from "express";
import GrupoController from "../controllers/GrupoController.js";

const router = express.Router();

/**
 * @swagger
 * /grupos:
 *   get:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 * 
 */

router
  .get("/grupos", GrupoController.listarGrupos)
  .get("/grupos/:id", GrupoController.listarGrupoPorId)
  .post("/grupos", GrupoController.cadastrarGrupo)
  .put("/grupos/:id", GrupoController.atualizarGrupo)
  .delete("/grupos/:id", GrupoController.excluirGrupo)

/* A comment. */
export default router;