const express = require('express');
const router = express.Router();
const path = require('path');
const con = require('../../config/db');

router.get('/borrow',function(req,res){
    res.sendFile(path.join(__dirname,'../../views/user/borrow.html'));
})

module.exports = router;