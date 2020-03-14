/*require('dotenv').config();
console.log(process.env.MONGO_URL);

const mongoose = require('mongoose');
const opt = {
    useUnifiedTopology:true,
    useNewUrlParser:true
};

mongoose.connect(process.env.MONGO_URL,opt);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function callback(){
    console.log("connected to mongo")
});*/

const express = require('express');
const parser = require('body-parser');

//create connection to database
require('./handlers/dataConnector.js').connect();

//create an express app
const app = express();
const Book = require('./models/Book');
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
// use the route handlers
const bookRouter = require('./handlers/bookRouter.js');
bookRouter.handleAllBooks(app, Book);
bookRouter.handleSingleBook(app, Book);
bookRouter.handleBooksByPageRange(app,Book);
bookRouter.handleAllCategories(app,Book);

let port = 8080;
app.listen(port, function () {
console.log("Server running at port= " + port);
});
