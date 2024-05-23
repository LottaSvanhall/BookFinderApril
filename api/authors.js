import Author from "../model/Authors.js";

export default function (server, mongoose) {

  server.get('/api/authors', async (req, res) => {
    try {
      const authors = await Author.find();
      res.status(200).json(authors);
    } catch (error) {
      res.status(500).json({ message: "Ett fel inträffade", error });
    }
  });

  // Skapar en GET-route för att hämta en specifik författare med ett specifikt ID.
  server.get('/api/authors/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Felaktigt id" });
    }

    try {
      const author = await Author.findById(req.params.id); // Hämtar författaren med ID från databasen.
      if (!author) {
        return res.status(404).json({ message: "Författaren hittades inte" });
      }
      res.json(author);
    } catch (error) {
      res.status(500).json({ message: "Ett fel uppstod på servern vid hämtning av en författare." });
    }
  });

  // Skapar en POST-route för att lägga till en ny författare.
  server.post('/api/authors', async (req, res) => {
    try {
      const newAuthor = new Author(
        {
          fullname: req.body.fullname,
          _id: req.body.id,
        }
      )
      const savedAuthor = await newAuthor.save() // Sparar den nya författaren i databasen.
      res.status(201).json({ // Skickar tillbaka den sparade författaren som JSON.
        newAuthor: newAuthor,
        savedAuthor: savedAuthor
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ett fel uppstod på servern vid skapande av ny författare." });
    }
  });

  // Skapar en PUT-route för att uppdatera en författare med ett specifikt ID.
  server.put('/api/authors/:id', async (req, res) => {
    try {
      const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body);
      if (!updatedAuthor) {
        return res.status(404).json({ message: "Författaren hittades inte" });
      }
      res.json(updatedAuthor);
    }catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ett fel uppstod på servern vid uppdatering av användare." });
    }
  });

  // Skapar en DELETE-route för att radera en författare med ett specifikt ID.
  server.delete('/api/authors/:id', async (req, res) => {
    try {
      const deletedAuthors = await Author.findByIdAndDelete(req.params.id);
      if (!deletedAuthors) {
        return res.status(404).json({ message: "Författaren hittades inte" });
      }
      res.json({ message: "Författaren har raderats!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ett fel uppstod på servern vid radering av författaren." });
    }
  });

}
