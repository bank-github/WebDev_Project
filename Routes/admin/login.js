const express = require('express');
const router = express.Router();
const con = require('../../config/db');
const bcrypt = require('bcrypt');
const path = require('path');

router.get('/login',function(req,res){
    res.sendFile(path.join(__dirname,'../../views/admin/login.html'))
});
 router.post('/login',function (req,res) {
    const { email, password } = req.body;
    const sql = "SELECT email,password FROM admin WHERE email=?";
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
                        // console.log(results[0].role);
                        res.status(200).send('Login success');
                        
                    }else{
                        res.status(401).send('Wrong password');
                    }
                }
            })
        }
    })
    
})

module.exports = router;