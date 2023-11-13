const express = require('express');
const router = express.Router();
const con = require('../../config/db');
const bcrypt = require('bcrypt');
const path = require('path');

router.get('/list', function (req, res) {
    if (req.session.role == '2') {
        res.sendFile(path.join(__dirname, '../../views/admin/list.html'))
    } else {
        res.redirect('/login');
    }
});


module.exports = router;