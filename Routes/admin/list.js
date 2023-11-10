const express = require('express');
const router = express.Router();
const con = require('../../config/db');
const bcrypt = require('bcrypt');
const path = require('path');

router.get('/list',function(req,res){
    res.sendFile(path.join(__dirname,'../../views/admin/list.html'))
});

router.get('/list-getassets', function (req, res) {
    const sql = `SELECT * FROM assets`;
    con.query(sql,function(err,result){
        if(err){
            return res.status(500).send('<h1>Database Error!</h1>');
        }
        res.status(200).send(result);
    })
});


module.exports = router;