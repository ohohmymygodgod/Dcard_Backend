var express = require('express');
var router = express.Router();
var db = require('../database/database.js')

function quickCheck(req, res, next) {
    const id = req.params.id;
    db.get('select max(id) from urls', (err, result) => {
        if(err) {
            res.status(500).send('Internal Server Error.\n')
        }else if(id > result['max(id)']) {
            res.status(404).send('Shorten Url Not Found.\n')
        }else {
            next()
        }
    })
}

function redirect(req, res, next) {
    const id = req.params.id;
    const sql = 'select id, originalUrl, expireAt from urls where id = ?'
    const params = [id]
    let originalUrl, expireAt
    db.get(sql, params, (err, result) => {
        if(err) {
            res.status(500).send('Internal Server Error.\n')
        }
        if(result) {
            if(result.expireAt < Date.now()) {
                res.status(404).send('Url is expired.\n')
            }else{
                res.redirect(result.originalUrl)
            }
        }
    })
}

router.get('/:id', quickCheck, redirect)

module.exports = router;