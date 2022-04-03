const res = require('express/lib/response');

const sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "./database/shortenUrl.db"


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE IF NOT EXISTS urls (
            id integer PRIMARY KEY AUTOINCREMENT,
            originalUrl text not null,
            expireAt integer not null
            )`,(err) => {
                if(err){
                    console.log(err)
                }
        })
    }
});
module.exports = db