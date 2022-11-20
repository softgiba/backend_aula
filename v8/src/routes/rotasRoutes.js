import express from "express";
import RotaController from "../controllers/RotaController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
const router = express.Router();

/**
 * @swagger
 * /rotas:
 *   get:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 * 
 */

router
  .get("/rotas", AuthMiddleware, RotaController.listarRotas)
  .get("/rotas/:id", AuthMiddleware, RotaController.listarRotaPorId)
  .post("/rotas", AuthMiddleware, RotaController.cadastrarRota)
  .put("/rotas/:id", AuthMiddleware, RotaController.atualizarRota)
  .patch("/rotas/:id", AuthMiddleware, RotaController.atualizarRota)
  .delete("/rotas/:id", AuthMiddleware, RotaController.excluirRota)

/* A comment. */
export default router;