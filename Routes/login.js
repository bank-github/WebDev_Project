const express = require('express');
const router = express.Router();
const con = require('../config/db');
const bcrypt = require('bcrypt');
const path = require('path');

router.get('/login',function(req,res){
    if(req.session.role == '0'){
        res.redirect('/user/main');
    }
    else if (req.session.role == '1') {
        res.redirect('/aj/main');
    }
    else if (req.session.role == '2') {
        res.redirect('/admin/main');
    }else{
        res.sendFile(path.join(__dirname,'../views/login.html'));
    }
})

router.post('/login',function (req,res) {
    const { email, password } = req.body;
    const sql = "SELECT * FROM user WHERE email=?";
    con.query(sql,[email],function (err, results) {
        if (err) {
            console.log(err);
            // !server error
            res.status(500).send('DB error');
        }else if(results.length != 1){
            // !client error
            res.status(401).send('This email not found!');
        }else{
            bcrypt.compare(password, results[0].password, function (err, same) {
                if (err) {
                    res.status(500).send('Password compare error');
                }else{
                    if (same) {
                        req.session.userID = results[0].user_id;
                        req.session.role = results[0].role;
                        res.status(200).send(`/user/main`);
                        // console.log(results[0].role);
                        // res.status(200).send('Login success');
                    }else{
                        res.status(401).send('Wrong password');
                    }
                }
            })
        }
    })
})

module.exports = router;