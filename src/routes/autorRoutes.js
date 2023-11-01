import express from "express";
import autorController from "../controllers/autorController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes
  .get("/autor", autorController.listarAutor, paginar)
  .get("/autor/:id", autorController.listarAutorPorId)
  .post("/autor", autorController.cadastrarAutor)
  .put("/autor/:id", autorController.atualizarAutor)
  .delete("/autor/:id", autorController.excluirAutor);

export default routes; 