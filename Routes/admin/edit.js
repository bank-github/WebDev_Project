const express = require('express');
const router = express.Router();
const con = require('../../config/db');
const bcrypt = require('bcrypt');
const path = require('path');

router.get('/edit',function(req,res){
    res.sendFile(path.join(__dirname,'../../views/admin/edit.html'))
});
router.get('/edit/:asset_id',function (req,res) {
    const asset_id = req.params.asset_id;
    // console.log(borrow_id);
    // res.send(asset_id);
    const query = `
    SELECT * FROM assets WHERE asset_id = ?;
    `;
    con.query(query, [asset_id], (err, results) => {
      if (err) {
        console.error('Error querying MySQL:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
        // console.log(results);
      }
    });
})

module.exports = router;