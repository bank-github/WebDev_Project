const express = require('express');
const router = express.Router();
const con = require('../config/db');
const bcrypt = require('bcrypt');
// const path = require('path');


router.post('/login',function (req,res) {
    const { email, password } = req.body;
    const sql = "SELECT role, email, user_id, password FROM user WHERE email=?";
    con.query(sql,[email],function (err, results) {
        if (err) {
            console.log(err);
            // !server error
            res.status(500).send('DB error');
        }else if(results.length != 1){
            // !client error
            res.status(401).send('email or password is wrong');
        }else{
            bcrypt.compare(password, results[0].password, function (err, same) {
                if (err) {
                    res.status(500).send('Password compare error');
                }else{
                    if (same) {
                        res.status(200).send(`${results[0].role}`);
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