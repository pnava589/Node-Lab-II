const path = require("path");

const sqlite3 = require("sqlite3").verbose();

const DB_PATH = path.join(__dirname,"data/art.db");
const db = new sqlite3.Database(DB_PATH);


let sql = `SELECT GenreID,GenreName,EraID,Description,Link
FROM Genres;`;

// retrieve all the data into memory
        db.all(sql, [], (err, rows) => {
        if (err) {
        throw err;
        }
        rows.forEach( genre => {
        console.log(genre.GenreName);
    });
});

//only put a row at a time into memory
sql = `SELECT ArtistID,FirstName,LastName 
FROM Artists WHERE NATIONALITY=? ;`; 
const params = ['France']; 
db.each(sql, params, (err, artist) => { 

    if(err){
        throw err;
    }
    
    console.log(`${artist.FirstName} ${artist.LastName}`);
    
});

//just a single record
sql = `SELECT PaintingID,Title
FROM Paintings where PaintingID=?;`;
    db.get(sql, [501], (err, painting) => {
    if (err) {
    throw err;
    }
    console.log('**** ' + painting.Title);
});

db.close();