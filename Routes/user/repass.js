const express = require('express');
const router = express.Router();
const con = require('../../config/db');
const bcrypt = require('bcrypt');
const path = require('path');

router.get('/repass', function (req, res) {
    res.sendFile(path.join(__dirname, '../../views/user/repass.html'))
});

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
})

module.exports = router;