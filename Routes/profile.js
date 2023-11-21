const express = require('express');
const router = express.Router();
const con = require('../config/db');

router.get('/profile', function (req, res) {
    if (req.session.userID) {
        const id = req.session.userID;
        const sql = `SELECT * FROM user WHERE user_id = ?`;
        con.query(sql, [id], function (err, result) {
            if (err) {
                return res.status(500).send('<h1>Database Error!</h1>');
            }
            res.status(200).send(result);
        })
    } 
    else {
         res.redirect('/login');
    }
});

router.put('/profile/:id', function (req, res) {
    const id = req.params.id;
    const { name, major, tel } = req.body;

      const sqlUpdate = 'UPDATE user SET name=?, major=?, tel_phone=? WHERE user_id = ?';
      con.query(sqlUpdate, [name, major, tel, id], function (err, result) {
        if (err) {
          console.error(err);
          return res.status(500).send('Database Error');
        }
 
        if (result.affectedRows === 0) {
          res.status(400).json("Update failed");
        } else {
          res.status(200).json("Update successful");
        }
      });
    });

module.exports = router;