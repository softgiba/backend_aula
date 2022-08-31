/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

import express from "express";
import GrupoController from "../controllers/GrupoController.js";

const router = express.Router();

router
  .get("/grupos", GrupoController.listarGrupos)
  .get("/grupos/:id", GrupoController.listarGrupoPorId)
  .post("/grupos", GrupoController.cadastrarGrupo)
  .put("/grupos/:id", GrupoController.atualizarGrupo)
  .delete("/grupos/:id", GrupoController.excluirGrupo)

/* A comment. */
export default router;