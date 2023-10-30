import NaoEncontrado from "../erros/NaoEncontrado.js";
import autor from "../models/Autor.js";

class autorController {

  static listarAutor = async (req, res) => {
    try {
      const autorResultado = await autor.find();
      res.status(200).json(autorResultado);
    } catch (erro){
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let novoAutor = new autor(req.body);
      const autorResultado = await novoAutor.save();
      res.status(201).send(autorResultado.toJSON());
    } catch (erro) {
      console.log(erro);
      next(erro);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

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
      const autorResultado = await autor.findByIdAndUpdate(id, {$set: req.body});
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
      const autorResultado = await autor.findByIdAndDelete(id);

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