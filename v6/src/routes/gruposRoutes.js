import express from "express";
import GrupoController from "../controllers/GrupoController.js";

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /grupos:
 *    get:
 *      tags:
 *      - grupos
 *      responses:
 *        200:
 *          description: Successo
 *          content:
 *            application/json:
 *              schema:
 *                grupo:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                    nome:
 *                      type: string
 *                    descricao:
 *                      type: string
 *        404:
 *          description: Nenhum grupo encontrado
 *          content:
 *            application/json:
 *               example: Not Found
*/


router
  // .get("/grupos", GrupoController.listarTodosGrupos)
  .get("/grupos", GrupoController.listarGrupos)
  .get("/grupos/busca", GrupoController.listarGruposPorNome)
  .get("/grupos/:id", GrupoController.listarGrupoPorId)
  .post("/grupos", GrupoController.cadastrarGrupo)
  .put("/grupos/:id", GrupoController.atualizarGrupo)
  .delete("/grupos/:id", GrupoController.excluirGrupo)

/* A comment. */
export default router;