const express = require('express');
const router = express.Router();
const con = require('../../config/db');
const bcrypt = require('bcrypt');
const path = require('path');

router.get('/list',function(req,res){
    res.sendFile(path.join(__dirname,'../../views/admin/list.html'))
});


module.exports = router;