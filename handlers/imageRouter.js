const handleAllImages = (app,Book) =>{
    app.route('/api/images')
    .get(function(req,resp){
        Book.find({},function(err,data){
            if(err){
                resp.json({message:'Unable to connect to books'});
            }
            else{
                resp.json(data);
            }
        });
    });
    
};

const handleSingleImage = (app,Image) =>{
    app.route('/api/images/:id')
    .get(function(req,resp){
        Image.find({id:req.params.id},function(err,data){
            if(err){
                resp.json({message:'Unable to connect to books'});
            }
            else{
                resp.json(data);
            }
        });
    });
    
    };

    const handleSingleImageByCity = (app,Image) =>{
        app.route('/api/images/city/:city')
        .get(function(req,resp){
            Image.find({'location.city': new RegExp(req.params.city,'i')},(err,data)=>{
                if(err){
                    resp.json({message:'Unable to connect to books'});
                }
                else{
                    resp.json(data);
                }
            });
         
            });
        
        };

        const handleImagesByCountry = (app,Image) =>{
            app.route('/api/images/country/:country')
            .get(function(req,resp){
                Image.find({'location.country': new RegExp(req.params.country,'i')},(err,data)=>{
                    if(err){
                        resp.json({message:'Unable to connect to books'});
                    }
                    else{
                        resp.json(data);
                    }
                });
             
                });
            
            };

//for root requests, render the index.pug view
const handlePageIndex = (app,Image) => {
    app.route('/')
        .get(function(req,resp){
            resp.render('index',{title: 'Node 2 Lab',heading: 'Sample Pug File'})
        });
}

const handlePageCountries = (app, Image) => {
        app.route('/travel')
        .get(function (req,resp) {
            Image.aggregate([
            {$group:{_id:"$location.country",id:{$first:"$id"},count:{$sum:1}}},{$sort:{_id:1}}],
            (err, data) =>{
            if (err) {
                resp.render('error', { page: 'travel'});
            } else {
                console.log(data);
                resp.render('list', { ImageData: data });
                }
            });
        });
    };

    const handlePageImages = (app, Image) => {
        app.route('/travel/photos/:country')
        .get(function (req,resp) {
            Image.find().where('location.country')
            .eq(req.params.country)
            .exec(function (err, data) {
            if (err) {
                resp.render('error', { page: 'travel/photos/'});
            } 
            else {
                console.log(data);
                resp.render('Images', { ImageData: data });
                }
            });
        });
    };

    const handlePageSingleImage = (app, Image) => {
        app.route('/travel/photo/:id')
        .get(function (req,resp) {
            Image.find({id: req.params.id}, (err, data) => {
            if (err) {
                resp.render('error', { page: 'travel/photo'});
            } else {
                resp.render('image', { ImageData: data[0] });
            }
         });
      });
    };

    const handlePageBooks = (app, Book) => {
        app.route('/site/list')
        .get(function (req,resp) {
            Book.find({}, function(err, data) {
            if (err) {
                resp.render('error', { page: 'site/list'});
            } else {
                resp.render('bookList', { bookData: data });
                }
            });
        });
    };

    const handlePageSingleBook = (app, Book) => {
        app.route('/site/book/:isbn')
        .get(function (req,resp) {
            Book.find({isbn10: req.params.isbn}, (err, data) => {
            if (err) {
                resp.render('error', { page: 'site/book'});
            } else {
                resp.render('book', { bookData: data[0] });
            }
         });
      });
    };


module.exports={
    handleAllImages,
    handleSingleImage,
    handleSingleImageByCity,
    handleImagesByCountry,
    handlePageIndex,
    handlePageCountries,
    handlePageImages,
    handlePageSingleImage,
    handlePageSingleBook,
    handlePageBooks
};

