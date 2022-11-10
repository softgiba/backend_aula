import express from "express";
import LoginController from "../controllers/LoginController.js";

const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 */

router
  .post("/login", LoginController.logar)

export default router;