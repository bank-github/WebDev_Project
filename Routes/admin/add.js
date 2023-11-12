const express = require('express');
const router = express.Router();
const con = require('../../config/db');
const bcrypt = require('bcrypt');
const path = require('path');

router.get('/add', function (req, res) {
    if (req.session.role == '2') {
        res.sendFile(path.join(__dirname, '../../views/admin/add.html'))
    } else {
        res.redirect('/login');
    }
});

module.exports = router;