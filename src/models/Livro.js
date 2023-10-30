import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String, 
      required: [true, "O titulo do livro é obrigatório."]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "autor", 
      required: [true, "O autor é obrigatório"]
    },
    editora: {
      type: String, required: [true, "A editora é obrigatória."]
    },
    numeroPaginas: {type: Number}
  }
);

const livro = mongoose.model("livro", livroSchema);

export default livro; 