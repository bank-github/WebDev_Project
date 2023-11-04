const express = require('express');
const router = express.Router();
const con = require('../../config/db');
const bcrypt = require('bcrypt');
const path = require('path');

//go to register page
router.get('/register', function (req, res) {
    // res.send(__dirname);
    res.sendFile(path.join(__dirname, "../../views/user/register.html"));
    // res.redirect('/');
});
 
// register to database
router.post('/register', function (req, res) {
    const { name, email, password, conpass, major, year, phoneNum, stu_id } = req.body;
    // hash pass
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            return res.status(500).send("Hash error!");
        }
        // find email
        const findEmail = 'SELECT email FROM user WHERE email = ?'
        con.query(findEmail, [email], function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).send("Server error!");
            }
            else if (result.length > 0) {
                res.status(401).send("Email has already used!");
            } else {
                // check password
                if (password !== conpass) {
                    return res.status(401).send('Password miss match!');
                }
                // correct data
                const sql = `INSERT INTO user (name, email, password, major, year, tel, stu_id, role) VALUES (?,?,?,?,?,?,?,1)`;
                con.query(sql, [name, email, hash, major, year, phoneNum, stu_id], function (err, result) {
                    if (err) {
                        console.error(err);
                        res.status(500).send("Server error insert data!");
                    } else {
                        res.send('/user/main');
                    }
                });
            }
        })
    });
});

module.exports = router;