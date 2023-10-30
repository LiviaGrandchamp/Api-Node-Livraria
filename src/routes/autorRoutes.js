import express from "express";
import autorController from "../controllers/autorController.js";

const routes = express.Router();

routes
  .get("/autor", autorController.listarAutor)
  .get("/autor/:id", autorController.listarAutorPorId)
  .post("/autor", autorController.cadastrarAutor)
  .put("/autor/:id", autorController.atualizarAutor)
  .delete("/autor/:id", autorController.excluirAutor);

export default routes; 