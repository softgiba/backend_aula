import express from "express";
import GrupoController from "../controllers/GrupoController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

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
 *        500:
 *          description: Erro no oServidor
 *          content:
 *            application/json:
 *               example: Erro no Servidor
 * 
*/

router
  .get("/grupos", AuthMiddleware, GrupoController.listarGrupos)
  .get("/grupos/:id", AuthMiddleware, GrupoController.listarGrupoPorId)
  .post("/grupos", AuthMiddleware, GrupoController.cadastrarGrupo)
  .put("/grupos/:id", AuthMiddleware, GrupoController.atualizarGrupo)
  .patch("/grupos/:id", AuthMiddleware, GrupoController.atualizarGrupo)
  .delete("/grupos/:id", AuthMiddleware, GrupoController.excluirGrupo)

/* A comment. */
export default router;