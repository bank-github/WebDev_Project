const express = require('express');
const router = express.Router();
const con = require('../config/db');


router.get('/data-profile', function (req, res) {
    if (req.session.userID) {
        const id = req.session.userID;
        const sql = `SELECT * FROM user WHERE user_id = ?`;
        con.query(sql, [id], function (err, result) {
            if (err) {
                return res.status(500).send('<h1>Database Error!</h1>');
            }
            res.status(200).send(result);
        })
    } else {
        res.redirect('/login');
    }
});
module.exports = router;