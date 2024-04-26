# Hej Läraren, jag gör ett försök med att satsa på VG i detta projekt :)
# //mvh Lotta

# Setup
All needed info about this BookFinder API will be found here on my Github account.

Start with downloading the repository and open it as a new project in Visual Studio Code.

In VS terminal run ${\color{blue} npm \space init-y}$ and a ”package.json”-file will be created. Make sure ”type”: ”module” is added in this file.

Install Express and Mongoose in VS by running ${\color{blue} npm \space i \space express \space mongoose}$

Open the ”server.js” file and enter your own connection string values (username and password) to the MongoDB database.
Example of how string looks in server.js: 
mongoose.connect("mongodb+srv://<Username>:<Password>@cluster0.nyncb7g.mongodb.net/<DB-Name>")

When done start the server in terminal by enter ${\color{blue} node \space server.js}$

Seeding the database with dummy data is done by running ${\color{blue} node \space seedDB.js}$
Before you run the seedDB.js make sure that you also in this file, enter your own connection string values (username and password) to the MongoDB database.
See example above.

Link to my Postman workspace – https://www.postman.com/lottasv/workspace/my-workspace
