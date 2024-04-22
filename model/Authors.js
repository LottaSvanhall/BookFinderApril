import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  fullname: String,
  book: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

const Author = mongoose.model('Author', authorSchema);

export default Author;