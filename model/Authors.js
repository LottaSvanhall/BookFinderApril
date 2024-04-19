import mongoose from "mongoose";

// Skapar ett schema för "users", vilket definierar strukturen för varje "user"-dokument i databasen.
const authorSchema = new mongoose.Schema({
  fullname: String,  // Varje "user" kommer att ha ett "username".
  book: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

/* 
  Skapar en Mongoose-modell baserat på usersSchema.
  Detta möjliggör för oss att skapa, läsa, uppdatera och radera (CRUD) dokument i vår "users"-samling (collection).
*/
const Author = mongoose.model('Author', authorSchema);

export default Author;