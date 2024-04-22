import Author from "../model/Authors.js";

export default function (server, mongoose) {

  server.get('/api/authors', async (req, res) => {
    try {
      const authors = await Author.find().populate("book");
      res.status(200).json(authors);
    }
    catch (error) {
      res.status(500).json({ message: "Ett fel inträffade", error });
    }
  });

  server.get('/api/authors/:id', async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Felaktigt id" });
    }

    try {
      const author = await Author.findById(req.params.id);
      if (!author) {
        return res.status(404).json({ message: "Författaren hittades inte" });
      }
      res.json(author);
    }
    catch (error) {
      res.status(500).json({ message: "Ett fel uppstod på servern vid hämtning av en författare." });
    }
  });

  server.post('/api/authors', async (req, res) => {
    try {
      const newAuthor = new Author(
        {
          fullname: req.body.fullname,
          book: req.body.book
        }
      )
      const savedAuthor = await newAuthor.save()
      res.status(201).json(savedAuthor);
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ett fel uppstod på servern vid skapande av ny författare." });
    }
  });

  server.put('/api/authors/:id', async (req, res) => {
    try {
      const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body);

      if (!updatedAuthor) {
        return res.status(404).json({ message: "Författaren hittades inte" });
      }

      res.json(updatedAuthor);
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ett fel uppstod på servern vid uppdatering av användare." });
    }
  });

  server.delete('/api/authors/:id', async (req, res) => {
    try {
      const deletedAuthors = await Author.findByIdAndDelete(req.params.id);
      if (!deletedAuthors) {
        return res.status(404).json({ message: "Författaren hittades inte" });
      }
      res.json({ message: "Författaren har raderats!" });
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ett fel uppstod på servern vid radering av författaren." });
    }
  });

}
