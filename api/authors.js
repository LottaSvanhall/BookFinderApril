import Author from "../model/Authors.js";

export default function (server, mongoose) {
  /*
    // Skapar ett schema för "users", vilket definierar strukturen för varje "user"-dokument i databasen.
    const authorSchema = new mongoose.Schema({
      fullname: String,  // Varje "user" kommer att ha ett "username".
      book: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
    });
  
      //Skapar en Mongoose-modell baserat på usersSchema.
      //Detta möjliggör för oss att skapa, läsa, uppdatera och radera (CRUD) dokument i vår "users"-samling (collection).
    
    const Author = mongoose.model('Author', authorSchema);
  */
  // Express route för att hämta böcker med författare
  server.get('/api/authors', async (req, res) => {
    try {
      const authors = await Author.find().populate("book");
      res.status(200).json(authors);
    } catch (error) {
      res.status(500).json({ message: "Ett fel inträffade", error });
    }
  });

  // Skapar en GET-route för att hämta en specifik användare med ett specifikt ID.
  server.get('/api/authors/:id', async (req, res) => {
    
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Felaktigt id" });
    }

    try {
      const author = await Author.findById(req.params.id); // Hämtar användaren med ID från databasen.
      if (!author) {
        return res.status(404).json({ message: "Författaren hittades inte" });
      }
      res.json(author);
    } catch (error) {
      res.status(500).json({ message: "Ett fel uppstod på servern vid hämtning av en författare." });
    }
  });

  /*  // Skapar en GET-route för att hämta alla böcker.
    server.get('/api/authors', async (req, res) => {
      try {
        const author = await Author.find();
        if (!author) {
          return res.status(404).json({ message: "Boken hittades inte" });
        }
        res.json(author);
      } catch (error) {
        res.status(500).json({ message: "Ett fel uppstod på servern vid hämtning av en bok." });
      }
    });
    */

  // Skapar en POST-route för att lägga till en ny användare.
  server.post('/api/authors', async (req, res) => {
    try {
      const newAuthor = new Author(
        {
          fullname: req.body.fullname,
          book: req.body.book
        }
      ) // Skapar en ny användare med "username" från request body.
      const savedAuthor = await newAuthor.save() // Sparar den nya användaren i databasen.
      res.status(201).json(savedAuthor); // Skickar tillbaka den sparade användaren som JSON.
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ett fel uppstod på servern vid skapande av ny författare." });
    }
  });

  // Skapar en PUT-route för att uppdatera en användare med ett specifikt ID.
  server.put('/api/authors/:id', async (req, res) => {
    try {
      const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body); // Returnerar den uppdaterade användaren.
      if (!updatedAuthor) {
        return res.status(404).json({ message: "Författaren hittades inte" });
      }
      res.json(updatedAuthor); // Skickar tillbaka den uppdaterade användaren som JSON.
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ett fel uppstod på servern vid uppdatering av användare." });
    }
  });

  // Skapar en DELETE-route för att radera en bok med ett specifikt ID.
  server.delete('/api/authors/:id', async (req, res) => {
    try {
      const deletedAuthors = await Author.findByIdAndDelete(req.params.id);
      if (!deletedAuthors) {
        return res.status(404).json({ message: "Författaren hittades inte" });
      }
      res.json({ message: "Författaren har raderats!" }); // Bekräftelse på att boken har raderats.
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ett fel uppstod på servern vid radering av författaren." });
    }
  });

}
