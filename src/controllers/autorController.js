import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../models/index.js";

class autorController { 

  static listarAutor = async (req, res, next) => {
    try {
      const autorResultado = autores.find();
      req.resultado = autorResultado;
      next();
    } catch (erro){
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let novoAutor = new autores(req.body);
      const autorResultado = await novoAutor.save();
      res.status(201).send(autorResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorEncontrado = await autores.findById(id);

      if(autorEncontrado !== null){
        res.status(200).send(autorEncontrado);
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }

  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorResultado = await autores.findByIdAndUpdate(id, {$set: req.body});
      if(autorResultado !== null){
        res.status(200).send({message: "Autor atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirAutor = async (req, res, next) => { 
    try {
      const id = req.params.id;
      const autorResultado = await autores.findByIdAndDelete(id);

      if(autorResultado !== null){
        res.status(200).send({message: "Autor removido com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default autorController;