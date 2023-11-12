const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../config/db');

// ! get all data in borrow and get data from FK 
router.get('/borrows', function (req, res) {
    const query = `
    SELECT borrow.*, assets.*,user.name FROM borrow 
    JOIN assets ON borrow.asset_id = assets.asset_id
    JOIN user ON borrow.user_id = user.user_id;
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error querying MySQL:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
        // console.log(results);
      }
    });
  })

// ! change message & status in borrow
router.post('/borrows/:borrow_id' ,function (req,res) {
    const borrow_id = req.params.borrow_id;
    const update = req.body;
    const query = `UPDATE borrow SET status = ?, message = ? WHERE borrow_id = ? `; 
    db.query(query, [update.status,update.message,borrow_id] , function (err,result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Database server error');
        }else if(result.affectedRows != 1){
            console.error('Row update is not 1');
            return res.status(500).send('Update failed');

        }else{
            res.send('Update succesfully');
        }
        
    })

})

  module.exports = router