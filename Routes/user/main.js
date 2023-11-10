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

module.exports = router;