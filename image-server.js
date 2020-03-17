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

// serves up static files from the public folder
app.use(express.static('public'));
//also add a path to static
app.use('/static',express.static('public'));

app.set('views','./views');
app.set('view engine','pug');

const Image = require('./models/Image');
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
// use the route handlers
const imageRouter = require('./handlers/imageRouter.js');
imageRouter.handleAllImages(app, Image);
imageRouter.handleSingleImage(app,Image);
imageRouter.handleSingleImageByCity(app,Image);
imageRouter.handleImagesByCountry(app,Image);
//imageRouter.handleCreateImage(app,Image);
imageRouter.handlePageIndex(app,Image);
imageRouter.handlePageCountries(app,Image);
imageRouter.handlePageImages(app,Image);
imageRouter.handlePageSingleImage(app,Image);


let port = 8080;
app.listen(port, function () {
console.log("Server running at port= " + port);
});
