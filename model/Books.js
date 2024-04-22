import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  genre: String,
  year: Number,
  book_grade: Number,
  info: String

});

const Book = mongoose.model('Book', bookSchema);

export default Book;