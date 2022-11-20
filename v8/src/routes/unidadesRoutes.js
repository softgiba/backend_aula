import express from "express";
import UnidadeController from "../controllers/UnidadeController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
const router = express.Router();

/**
 * @swagger
 * /unidades:
 *   get:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 * 
 */

router
  .get("/unidades", AuthMiddleware, UnidadeController.listarUnidades)
  .get("/unidades/:id", AuthMiddleware, UnidadeController.listarUnidadePorId)
  .post("/unidades", AuthMiddleware, UnidadeController.cadastrarUnidade)
  .put("/unidades/:id", AuthMiddleware, UnidadeController.atualizarUnidade)
  .patch("/unidades/:id", AuthMiddleware, UnidadeController.atualizarUnidade)
  .delete("/unidades/:id", AuthMiddleware, UnidadeController.excluirUnidade)

/* A comment. */
export default router;