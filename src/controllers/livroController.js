import livro from "../models/Livro.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const listaLivros = await livro.find()
        .populate("autor")
        .exec();

      res.status(200).json(listaLivros);
    } catch (erro) {
      console.log(erro);
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let novoLivro = new livro(req.body);
      const livroResultado = await novoLivro.save();
      res.status(201).send(livroResultado.toJSON());
    } catch (erro){
      next(erro);
    }
  };

  static listarLivrosPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id)
        .populate("autor", "nome")
        .exec();
      if(livroEncontrado !== null){
        res.status(200).send(livroEncontrado);
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findByIdAndUpdate(id, {$set: req.body});
      console.log(livroEncontrado);

      if(livroEncontrado !== null){
        res.status(200).send({message: "Livro atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
      
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findByIdAndDelete(id);
      console.log(livroEncontrado);

      if(livroEncontrado !== null){
        res.status(200).send({message: "Livro removido com sucesso"});
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
      
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivrosPorEditora = async (req, res, next) => { 
    try {
      const editora = req.query.editora;
      const livrosPorEditora = await livro.find({ "editora": editora});
      res.status(200).json(livrosPorEditora);
    } catch (erro) {
      next(erro);
    }
  };

}

export default LivroController;