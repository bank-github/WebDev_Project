const express = require('express');
const router = express.Router();
const path = require('path');
const con = require('../../config/db');
const { readdir } = require('fs');

router.get('/list',function(req,res){
    if(req.session.role == '0'){
        res.sendFile(path.join(__dirname,'../../views/user/list.html'));
    }else{
        res.redirect('/login');
    }
})

module.exports = router;