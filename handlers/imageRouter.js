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

module.exports={
    handleAllImages,
    handleSingleImage,
    handleSingleImageByCity,
    handleImagesByCountry

};