var express = require('express');
var router = express.Router();
var db = require('../database/database.js')

router.post("/", async function(req, res) {
    var data = req.body;
    const sql = 'insert into urls (originalUrl, expireAt) values (?,?)';
    const params = [data.url, Date.parse(data.expireAt)]
    db.run(sql, params, function(err, result) {
        if(err) {
            res.status(500).send(err)
        }else{
            res.status(200).send(JSON.stringify({
                id: this.lastID,
                shotUrl: `http://localhost/${this.lastID}`
            }))
        }
    })
    // View all shorten url in datbase
    // db.all('select id, originalUrl, expireAt from urls', (err, result) => {
    //     if(err) console.error(err)
    //     console.log(result)
    // })
})

module.exports = router;