export default function (server, mongoose) {

  // Skapar ett schema för "users", vilket definierar strukturen för varje "user"-dokument i databasen.
  const bookSchema = new mongoose.Schema({
    title: String,  // Varje "user" kommer att ha ett "username".
    author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
    genre: String,
    year: Number,
    book_grade: Number,
    info: String

  });

  /* e
    Skapar en Mongoose-modell baserat på bookSchema.
    Detta möjliggör för oss att skapa, läsa, uppdatera och radera (CRUD) dokument i vår "users"-samling (collection).
  */
  const Book = mongoose.model('Book', bookSchema);

  // Express route för att hämta böcker med författare
  server.get("/api/books", async (req, res) => {
    try {
      const books = await Book.find(req.params.page, req.params.limit).populate("author");
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: "Ett fel inträffade", error });
    }
  });

  // Skapar en GET-route för att söka på en boktitel.
  /*server.get("/api/books/:id", async (req, res) => {
    try {
      const book = await Book.find(req.params.ObjectId); // Hämtar bok med ID från databasen.
      if (!book) {
        return res.status(404).json({ message: "2Boken hittades inte2" });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: "Ett fel uppstod på servern vid hämtning av en bok vid sökning." });
    }
  });
*/

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
  /*
    // Skapar en GET-route för att söka på en boktitel.
    server.get("/api/books/:id?fields=title=true", async (req, res) => {
      try {
        const book = await Book.find(req.params.ObjectId); // Hämtar bok med ID från databasen.
        if (!book) {
          return res.status(404).json({ message: "Boken hittades inte2" });
        }
        res.json(book);
      } catch (error) {
        res.status(500).json({ message: "Ett fel uppstod på servern vid hämtning av en bok vid sökning." });
      }
    });*/

  // Skapar en GET-route för att hämta alla böcker.
  /*server.get('/api/books', async (req, res) => {
    try {
      const book = await Book.find();
      if (!book) {
        return res.status(404).json({ message: "Boken hittades inte" });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: "Ett fel uppstod på servern vid hämtning av en bok." });
    }
  });*/

  // Skapar en POST-route för att lägga till en ny användare.
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


      const savedBook = await newBook.save() // Sparar den nya användaren i databasen.
      res.status(201).json(savedBook); // Skickar tillbaka den sparade användaren som JSON.
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ett fel uppstod på servern vid skapande av ny bok." });
    }
  });

  // Skapar en PUT-route för att uppdatera en användare med ett specifikt ID.
  // Skapar en PUT-route för att uppdatera en bok med ett specifikt ID.
  server.put('/api/books/:id', async (req, res) => {
    try {
      const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body)
        .populate();
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
      res.json({ message: "Boken har raderats!" }); // Bekräftelse på att boken har raderats.
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ett fel uppstod på servern vid radering av boken." });
    }
  });

}
