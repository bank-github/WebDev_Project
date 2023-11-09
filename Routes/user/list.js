const express = require('express');
const router = express.Router();
const path = require('path');
const con = require('../../config/db');

router.get('/list',function(req,res){
    res.sendFile(path.join(__dirname,'../../views/user/list.html'));
})

module.exports = router;