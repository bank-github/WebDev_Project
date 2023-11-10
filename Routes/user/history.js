const express = require('express');
const router = express.Router();
const path = require('path');
const con = require('../../config/db');

router.get('/history',function(req,res){
    if(req.session.role =='0'){
        res.sendFile(path.join(__dirname,'../../views/user/history.html'));
    }
    else{
        res.redirect('/login');
    }
})

module.exports = router;