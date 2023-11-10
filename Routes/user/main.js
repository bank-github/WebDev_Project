const express = require('express');
const router = express.Router();
const path = require('path');
const con = require('../../config/db');

// go to main page
router.get('/main', function (req, res) {
    if (req.session.role == '0') {
        res.sendFile(path.join(__dirname, "../../views/user/main.html"));
    }
    // else if (req.session.role == '1') {
    //     res.redirect('/aj/main');
    // }
    // else if (req.session.role == '2') {
    //     res.redirect('/admin/main');
    // }
    else {
        res.redirect('/login');
    }
});

router.get('/main-all', function (req, res) {
    const sql = `SELECT * FROM assets`;
    con.query(sql, function (err, result) {
        if (err) {
            return res.status(500).send('<h1>Database Error!</h1>');
        }
        res.status(200).send(result);
    })
});

module.exports = router;