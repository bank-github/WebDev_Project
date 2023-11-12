const express = require('express');
const router = express.Router();
const path = require('path');
const con = require('../../config/db');

router.get('/borrow', function (req, res) {
    if (req.session.role == '0') {
        res.sendFile(path.join(__dirname, '../../views/user/borrow.html'));
    }
    else {
        res.redirect('/login');
    }
})

router.post('/borrow', function (req, res) {
    if (req.session.userID) {
        const userID = req.session.userID;
        // const userID = 1;
        const { brDate, rtDate, asset_id } = req.body;
        // console.log(brDate + rtDate + asset_id)
        const sql = `INSERT INTO borrow (borrow_date, return_date, status, user_id, asset_id) VALUES (?, ?, 0, ?, ?)`;
        con.query(sql, [brDate, rtDate, userID, asset_id], function (err, result) {
            if (err) {
                // console.error(err);
                res.status(500).send("Server error insert data!");
            } else {
                const assetUpdate = `UPDATE assets SET status = 0 WHERE asset_id = ?`;
                con.query(assetUpdate, [asset_id], function (err, result) {
                    if (err) {
                        res.status(500).send("Server error update data!");
                    } else {
                        res.send('success!');
                    }
                })

            }
        });
    } else {
        res.status(500).send('Session Expried!')
    }
})

module.exports = router;