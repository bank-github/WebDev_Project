const express = require('express');
const router = express.Router();
const con = require('../config/db');
const bcrypt = require('bcrypt');
const path = require('path');
const session = require('express-session');

router.use(session({
    secret: 'keyUSerID',
    resave: false,
    saveUninitialized: true,
}));

// session check already login or not
router.get('/login', function (req, res) {
    if (req.session.role == '0') {
        res.redirect('/user/assetlist');
    }
    else if (req.session.role == '1') {
        res.redirect('/aj/dashboard');
    }
    else if (req.session.role == '2') {
        res.redirect('/admin/dashboard');
    } else {
        res.sendFile(path.join(__dirname, '../views/login.html'));
    }
});

// login
router.post('/login', function (req, res) {
    const { email, password } = req.body;
    const sql = "SELECT * FROM user WHERE email=?";
    con.query(sql, [email], function (err, results) {
        if (err) {
            console.log(err);
            // !server error
            res.status(500).send('DB error');
        } else if (results.length != 1) {
            // !client error
            res.status(401).send('This email not found!');
        } else {
            bcrypt.compare(password, results[0].password, function (err, same) {
                if (err) {
                    res.status(500).send('Password compare error');
                } else {
                    if (same) {
                        req.session.email = results[0].email;
                        req.session.userID = results[0].user_id;
                        req.session.role = results[0].role;
                        req.session.name = results[0].name;
                        // console.log(results[0].user_id)
                        const id = results[0].user_id;
                        res.send(`${id}`);
                        // console.log(results[0].role);
                        // res.status(200).send('Login success');
                    } else {
                        res.status(401).send('Wrong password');
                    }
                }
            })
        }
    })
});

// logout and destroy session
router.get('/logout', function (req, res) {
    req.session.destroy(function (err,) {
        if (err) {
            console.error(err);
            res.status(500).send('Cannot logout');
        } else {
            res.redirect('/login');
        }
    })
});

// register
router.post('/register', function (req, res) {
    const { name, email, password, major, year, phoneNum, stu_id } = req.body;
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
            // hash pass
            bcrypt.hash(password, 10, function (err, hash) {
                if (err) {
                    return res.status(500).send("Hash error!");
                }
                const sql = `INSERT INTO user (name, email, password, major, year, tel_phone, stu_id, role) VALUES (?,?,?,?,?,?,?,0)`;
                con.query(sql, [name, email, hash, major, year, phoneNum, stu_id], function (err, result) {
                    if (err) {
                        console.error(err);
                        res.status(500).send("Server error insert data!");
                    } else {
                        res.send('Register Success');
                    }
                });

            });
        }
    }
    )
});

// forgot (input email)
router.post('/forgot', function (req, res) {
    const { email } = req.body;
    const sql = `SELECT email,user_id FROM user WHERE email = ?`;
    con.query(sql, [email], function (err, result) {
        // check for error
        if (err) {
            res.status(500).send('Server Error!');
        } else if (result.length != 1) {
            res.status(401).send('Email not found!');
        } else {
            //check email 
            if (result[0].user_id == 1 || result[0].user_id == 1) {
                res.status(400).send("This is Aj or Admin email!");
            } else {
                res.send(`${result[0].user_id}`);
            }
        }
    });
});

// repass (repassword when email pass is forgot)
router.post('/repass/:id', function (req, res) {
    const id = req.params.id;
    const { password } = req.body;
    // find older password
    const sql = `SELECT password FROM user WHERE user_id = ?`
    con.query(sql, [id], function (err, result) {
        if (err) {
            return res.status(500).send('Database Error!');
        }
        // check this password is use or not
        bcrypt.compare(password, result[0].password, function (err, same) {
            if (err) {
                return res.status(500).send('Compare Error!');
            }
            if (same) {
                res.status(401).send('This password is currently use!!');
            } else {
                bcrypt.hash(password, 10, function (err, hash) {
                    if (err) {
                        return res.status(500).send('Hash error!');
                    }
                    const sql = `UPDATE user SET password = ? WHERE user_id = ?`;
                    con.query(sql, [hash, id], function (err, result) {
                        if (err) {
                            console.error(err);
                            return res.status(500).send('Database error!');
                        }
                        if (result.affectedRows != 1) {
                            return res.status(500).send('Row delete more than 1');
                        }
                        res.send('Password has been changed!!!');
                    })
                });
            }
        });
    });
});

module.exports = router;