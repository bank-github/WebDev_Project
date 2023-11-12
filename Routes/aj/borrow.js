const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../../config/db');
 
router.get('/borrow',function (req,res) {
    if(req.session.role == '1'){
      res.sendFile(path.join(__dirname,'../../views/aj/borrow.html'));
    }else{
      res.redirect('/login');
    }
})

router.get('/borrow-getdata-approve/:borrow_id', function (req, res) {
    const borrow_id = req.params.borrow_id;
    // console.log(borrow_id);
    // res.send(borrow_id);
    const query = `
    SELECT borrow.*, assets.*,user.name FROM borrow 
    JOIN assets ON borrow.asset_id = assets.asset_id
    JOIN user ON borrow.user_id = user.user_id WHERE borrow_id = ?;
    `;
    db.query(query, [borrow_id], (err, results) => {
      if (err) {
        console.error('Error querying MySQL:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
        // console.log(results);
      }
    });
  })

router.delete('/borrow-delete/:borrow_id',function (req,res) {
    const borrow_id = req.params.borrow_id;
    const query = ``
})

module.exports = router;