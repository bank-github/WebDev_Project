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

router.delete('/assets/:id', function (req, res) {
    const id = req.params.id;
    const sqlbr = `DELETE FROM borrow WHERE asset_id = ?`;
    con.query(sqlbr, [id], function (err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Database Error!');
        }
        const sql = `DELETE FROM assets WHERE asset_id = ?`;
        con.query(sql, [id], function (err, result) {
            if (err) {
                console.error(err);
                return res.status(500).send('Database Error!');
            }
            res.send('Deleted!');
        })
    })
})

module.exports = router;