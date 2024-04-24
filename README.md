# Setup
All needed info about this BookFinder API will be found here on my Github account.

Start with downloading the repository and open it as a new project in Visual Studio Code.

In VS terminal run npm init-y  then a ”package.json”-file will be created. Make sure ”type”: ”module” is added in this file.

Install Express and Mongoose in VS by running – npm i express mongoose

Open the ”server.js” file and enter your own connection string values (username and password) to the MongoDB database.
Example how string looks in server.js: 
mongoose.connect("mongodb+srv://<Username>:<Password>@cluster0.nyncb7g.mongodb.net/<DB-Name>")

When done start the server in terminal by enter – node server.js

Seeding the database with dummy data is done by running - node seedDB.js


Link to my Postman workspace – https://www.postman.com/lottasv/workspace/my-workspace
