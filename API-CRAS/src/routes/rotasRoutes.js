import express from "express";
import RotaController from "../controllers/RotaController.js";
import AuthMidleware from "../middlewares/AuthMidleware.js";

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

// router.use(AuthMidleware); // Forçando autenticação em todas as rotas

router
  .get("/rotas", AuthMidleware, RotaController.listarRotas)
  .get("/rotas/:id", AuthMidleware, RotaController.listarRotaPorId)
  .post("/rotas", AuthMidleware, RotaController.cadastrarRota)
  .put("/rotas/:id", AuthMidleware, RotaController.atualizarRota)
  .patch("/rotas/:id", AuthMidleware, RotaController.atualizarRota)
  .delete("/rotas/:id", AuthMidleware, RotaController.excluirRota)

/* A comment. */
export default router;