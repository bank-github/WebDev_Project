const express = require('express');
const router = express.Router();
const path = require('path');
const con = require('../../config/db');

// go to main page
router.get('/history', function (req, res) {
    if(req.session.role == '1'){
        res.sendFile(path.join(__dirname, "../../views/aj/history.html"));
    }else{
        res.redirect('/login');
    }
});

module.exports = router;