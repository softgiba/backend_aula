/**
 * Rotas de customers.
 * Os endereços definidos para o objeto Router
 * são relativos a /customers,
 * assim, não temos (e nem deve-se) repetir
 * tal endereço. Se for preciso mudar,
 * isso é feito de forma centralizada no index.js
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