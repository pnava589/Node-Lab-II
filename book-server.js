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
/* middleware section */ 

//view ware section

app.set('views','./views');
app.set('view engine','pug');

// serves up static files from the public folder
app.use(express.static('public'));
//also add a path to static
app.use('/static',express.static('public'));

//convert raw requests into usable data
app.use(parser.json());
app.use(parser.urlencoded({extended:true}));



const Book = require('./models/Book');
    
    // use the route handlers
    const bookRouter = require('./handlers/bookRouter.js');
    bookRouter.handleAllBooks(app, Book);
    bookRouter.handleSingleBook(app, Book);
    bookRouter.handleBooksByPageRange(app,Book);
    bookRouter.handleAllCategories(app,Book);
    bookRouter.handleCreateBook(app,Book);
    bookRouter.handlePageIndex(app,Book);
    bookRouter.handlePageBooks(app,Book);

// customize the 404 error with our own middleware function
app.use(function(req,resp,next){
    resp.status(404).send("Sorry can't find that!")
});

let port = 8080;
app.listen(port, function () {
    console.log("Server running at port= " + port)
});
