import express from "express";
import UnidadeController from "../controllers/UnidadeController.js";

const router = express.Router();

router
  .get("/unidades", UnidadeController.listarUnidades)
  .get("/unidades/:id", UnidadeController.listarUnidadePorId)
  .post("/unidades", UnidadeController.cadastrarUnidade)
  .put("/unidades/:id", UnidadeController.atualizarUnidade)
  .delete("/unidades/:id", UnidadeController.excluirUnidade)

/* A comment. */
export default router;