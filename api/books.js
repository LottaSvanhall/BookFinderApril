import Book from "../model/Books.js";

export default function (server, mongoose) {

  server.get("/api/books", async (req, res) => {
    try {
      const books = await Book.find().populate("author");
      res.status(200).json(books);
    }
    catch (error) {
      res.status(500).json({ message: "Ett fel inträffade", error });
    }
  });

  server.get("/api/books/all", async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1 // aktuell sida
      const limit = parseInt(req.query.limit) || 10 // antal element på en sida

      const totalBooks = await Book.countDocuments();
      const totalPages = Math.ceil(totalBooks / limit);

      const books = await Book.find()
        .limit(limit);

      res.status(200).json({
        books,
        currentPage: page,
        totalPages,
        totalBooks
      });

    }
    catch (error) {
      res.status(500).json({ message: "Ett fel inträffade2", error });
    }
  });

  server.get("/api/books/:id", async (req, res) => {
    try {
      const book = await Book.findById(req.params.id, req.query.fields); // Hämtar bok med ID från databasen.
      if (!book) {
        return res.status(404).json({ message: "Boken hittades inte" });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: "Ett fel uppstod på servern vid hämtning av en bok." });
    }
  });

  // Skapar en POST-route för att lägga till en ny bok.
  server.post('/api/books', async (req, res) => {
    try {
      const newBook = new Book(
        {
          title: req.body.title,
          author: req.body.author,
          genre: req.body.genre,
          year: req.body.year,
          book_grade: req.body.book_grade,
          info: req.body.info
        }
      )

      const savedBook = await newBook.save() // Sparar den nya boken i databasen.
      res.status(201).json({ // Skickar tillbaka den sparade boken som JSON.
        newBook: newBook,
        savedBook: savedBook,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ett fel uppstod på servern vid skapande av ny bok." });
    }
  });

  // Skapar en PUT-route för att uppdatera en bok med ett specifikt ID.
  server.put('/api/books/:id', async (req, res) => {
    try {
      const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body);
      if (!updatedBook) {
        return res.status(404).json({ message: 'Bok hittades inte' });
      }
      res.json(updatedBook);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ett fel uppstod på servern vid uppdatering av bok.' });
    }
  });

  // Skapar en DELETE-route för att radera en bok med ett specifikt ID.
  server.delete('/api/books/:id', async (req, res) => {
    try {
      const deletedBook = await Book.findByIdAndDelete(req.params.id);
      if (!deletedBook) {
        return res.status(404).json({ message: "Boken hittades inte" });
      }
      res.json({ message: "Boken har raderats!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ett fel uppstod på servern vid radering av boken." });
    }
  });

}
