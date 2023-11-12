const express = require('express');
const router = express.Router();
const path = require('path');
const con = require('../../config/db');

router.get('/borrow', function (req, res) {
    res.sendFile(path.join(__dirname, '../../views/user/borrow.html'));
})
router.post('/borrow', function (req, res) {
    const borrows = { borrow_id, borrow_date, borrow_time, return_date, return_time, status, message, user_id, asset_id, admin_name } = req.body;
    const sql = `INSERT INTO borrow (borrow_id,borrow_date,borrow_time, return_date, return_time, status, message, user_id, asset_id, admin_name) VALUES (?,?,?,?,?,?,?,?,?,?)`;
    con.query(sql, borrows, function (err, results) {
        if (err) {
            console.error(err);
            return res.status(500).send("Database server error");
        }
        if (results.affectedRows != 1) {
            console.error('Row added is not 1');
            return res.status(500).send("Add failed");
        }
        res.send('/user/list');
    });

});

module.exports = router;