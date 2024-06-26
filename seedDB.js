import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import Author from "./model/Authors.js";
import Book from "./model/Books.js";

console.log("Start seeding database!")

async function seedDB() {
  try {
    mongoose.connect("mongodb+srv://charlotteblomqvistsvanhall:abc123%40%40@cluster0.dqz80mc.mongodb.net/PVT23-SeedData")
    const authorList = await createAuthors(3)
    const bookList = await createBooks(3, authorList[0])
    console.log("AuthorList - ", authorList)
    console.log("BookList - ", bookList)
  }
  catch (error) {
    console.log(`Errormessage: ${error}`)
  }
}

async function createAuthors(amount) {
  const authorList = []
  for (let i = 0; i < amount; i++) {
    const newAuthor = new Author({
      fullname: faker.person.fullName(),
    })
    await newAuthor.save()
    authorList.push(newAuthor)
    console.log(`New author - ${newAuthor.fullname} - has been created.`)
  }
  console.log(`${amount} authors have been seeded.`)
  return authorList
}

async function createBooks(amount, newAuthor) {
  const bookList = []
  const genresList = ['feelgood', 'barn', 'deckare', 'romantik', 'rysare'];
  for (let i = 0; i < amount; i++) {
    const newBook = new Book({
      title: faker.lorem.words(3),
      author: newAuthor,

      genre: genresList[faker.number.int(5)],
      year: faker.number.int({ min: 1924, max: 2024 }),
      book_grade: faker.number.int({ min: 1, max: 5 }),
      info: faker.lorem.sentences(2)
    })
    await newBook.save()
    bookList.push(newBook)
    console.log(`New book - ${newBook.title} - has been created.`)
  }
  console.log(`${amount} books have been seeded.`)
  return bookList
}

seedDB()
