import mongoose from "mongoose";

// Skapar ett schema för "users", vilket definierar strukturen för varje "user"-dokument i databasen.
const bookSchema = new mongoose.Schema({
  title: String,  // Varje "user" kommer att ha ett "username".
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  genre: String,
  year: Number,
  book_grade: Number,
  info: String

});

/*
  Skapar en Mongoose-modell baserat på bookSchema.
  Detta möjliggör för oss att skapa, läsa, uppdatera och radera (CRUD) dokument i vår "users"-samling (collection).
*/
const Book = mongoose.model('Book', bookSchema);

export default Book;