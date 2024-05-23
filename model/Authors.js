import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  fullname: String
});

const Author = mongoose.model('Author', authorSchema);

export default Author;