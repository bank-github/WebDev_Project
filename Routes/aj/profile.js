const express = require('express');
const router = express.Router();
const path = require('path');
const con = require('../../config/db');

router.get('/profile',function(req,res){
    res.sendFile(path.join(__dirname,'../../views/aj/profile.html'));
})

module.exports = router;