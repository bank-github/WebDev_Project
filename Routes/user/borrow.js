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

module.exports = router;