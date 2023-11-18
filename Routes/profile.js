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

router.post('/update-profile', function (req, res) {
    const id = req.session.userID; // Fetch the user ID from the session
    // const email = req.session.email;

    // if (!id || !email) {

    //   return res.status(401).send('User not authenticated');
    // }
    console.log(id)
    const {name, major, tel} = req.body
    const sql = 'UPDATE user SET name=?, major=?, tel=? WHERE user_id = ?';
    con.query(sql, [name, major, tel, id], function (err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Database Error');
        }

        res.status(200).json("update success!");
    });
});

module.exports = router;