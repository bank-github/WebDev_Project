const express = require('express');
const router = express.Router();
const con = require('../config/db');

router.get('/assets', function (req, res) {
    const sql = `SELECT * FROM assets`;
    con.query(sql, function (err, result) {
        if (err) {
            return res.status(500).send('<h1>Database Error!</h1>');
        }
        res.status(200).send(result);
    })
});

module.exports = router;