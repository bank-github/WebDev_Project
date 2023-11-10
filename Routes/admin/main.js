const express = require('express');
const router = express.Router();
const con = require('../../config/db');
const bcrypt = require('bcrypt');
const path = require('path');

router.get('/main',function(req,res){
    if(req.session.role == '2'){
        res.sendFile(path.join(__dirname,'../../views/admin/main.html'));
    }
    // else if(req.session.role == '0'){
    //     res.redirect('/user/main');
    // }
    // else if(req.session.role == '1'){
    //     res.redirect('/aj/main');
    // }
    else{
        res.redirect('/login');
    }
});

module.exports = router