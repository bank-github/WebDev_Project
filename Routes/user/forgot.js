const express = require('express');
const router = express.Router();
const con = require('../../config/db');
// const bcrypt = require('bcrypt');
const path = require('path');

router.get('/forgot',function(req,res){
    res.sendFile(path.join(__dirname,'../../views/user/forgot.html'));
});

router.post('/forgot',function(req,res){
    const {email} = req.body;
    const sql = `SELECT email,user_id FROM user WHERE email = ?`;
    con.query(sql,[email],function(err,result){
        if(err){
            return res.status(500).send('Server Error!');
        }else if(result.length != 1){
            return res.status(401).send('Email not found!');
        }
        res.send(`${result[0].user_id}`);
    });
});

module.exports = router;