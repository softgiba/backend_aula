import express from "express";
import atendimentoController from "../controllers/AtendimentoController.js";
import AuthMidleware from "../middlewares/AuthMidleware.js";

const router = express.Router();

// router.use(AuthMidleware); // Forçando autenticação em todas as rotas

router
  .get("/atendimentos", AuthMidleware, atendimentoController.listarAtendimentos)
  .post("/atendimentos",  AuthMidleware, atendimentoController.cadastrarAtendimento)
  .patch("/atendimentos/:id", AuthMidleware, atendimentoController.atualizarAtendimento)
  
export default router;