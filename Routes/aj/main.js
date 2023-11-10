const express = require('express');
const router = express.Router();
const path = require('path');

// go to main page
router.get('/main', function (req, res) {
    if (req.session.role == '1') {
        res.sendFile(path.join(__dirname, "../../views/aj/main.html"));
    }
    // else if (req.session.role == '2') {
    //     res.redirect('/admin/main');
    // } 
    // else if (req.session.role == '0') {
    //     res.redirect('/user/main');
    // }
    else {
        res.redirect('/login');
    }

});

module.exports = router;