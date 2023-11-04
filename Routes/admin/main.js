const express = require('express');
const router = express.Router();
const con = require('../../config/db');
const bcrypt = require('bcrypt');
const path = require('path');

router.get('/main',function(req,res){
    res.sendFile(path.join(__dirname,'../../views/admin/main.html'))
});

module.exports = router