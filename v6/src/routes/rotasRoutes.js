import express from "express";
import RotaController from "../controllers/RotaController.js";

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
  .get("/rotas", RotaController.listarRotas)
  .get("/rotas/:id", RotaController.listarRotaPorId)
  .post("/rotas", RotaController.cadastrarRota)
  .put("/rotas/:id", RotaController.atualizarRota)
  .delete("/rotas/:id", RotaController.excluirRota)

/* A comment. */
export default router;