import express from "express";
import pessoaController from "../controllers/PessoaController.js";
import AuthMidleware from "../middlewares/AuthMidleware.js";

const router = express.Router();

router
  .get("/pessoas", AuthMidleware, pessoaController.listarPessoas)
  .post("/pessoas", AuthMidleware, pessoaController.cadastrarPessoa)
  .patch("/pessoas/:id", AuthMidleware, pessoaController.atualizarPessoa)

export default router;