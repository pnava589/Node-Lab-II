const handleAllBooks = (app,Book) =>{
app.route('/api/books')
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

const handleSingleBook = (app,Book) =>{
    app.route('/api/books/:isbn')
    .get(function(req,resp){
        Book.find({isbn10:req.params.isbn},function(err,data){
            if(err){
                resp.json({message:'Unable to connect to books'});
            }
            else{
                resp.json(data);
            }
        });
    });
    
    };


    // handle requests for books with specific page ranges:
// e.g., [domain]/api/books/pages/500/600
const handleBooksByPageRange = (app, Book) => {
        app.route('/api/books/pages/:min/:max')
        .get(function (req,resp) {
            Book.find().where('production.pages')
            .gt(req.params.min)
            .lt(req.params.max)
            .sort({ title: 1})
            .select('production title isbn10')
            .exec( function(err, data) {
                if (err) {
                    resp.json({ message: 'Books not found' });
                } 
                else {
                    resp.json(data);
                }
             });
         });
    };


// requests for [domain]/api/categories e.g. return all categories
const handleAllCategories = (app, Book) => {
    app.route('/api/categories')
    .get(function (req,resp) {
        // use an aggregrate function for this query
        Book.aggregate([
            { $group: {_id: "$category.main", count: {$sum:1}} },
            { $sort: {_id:1} }
            ], (err, data) => {
            if (err) {
                 resp.json({ message: 'Unable to connect to books' });
            } else {
                resp.json(data);
            }
        });
    });
};

module.exports={
    handleAllBooks,
    handleSingleBook,
    handleBooksByPageRange,
    handleAllCategories
};