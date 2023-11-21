const express = require('express');
const router = express.Router();
const con = require('../../config/db');
const bcrypt = require('bcrypt');
const path = require('path');
const uploadConfig = require('../../config/uploadConfig');
const upload = require('../../config/uploadConfig');

router.get('/edit', function (req, res) {
  if (req.session.role == '2') {
    res.sendFile(path.join(__dirname, '../../views/admin/edit.html'))
  } else {
    res.redirect('/login');
  }
});

router.post('/uploading',function (req,res) {
    upload(req,res,function (err) {
      if (err) {
        console.log(err);
        res.status(500).send('Upload failed');
      }else{
        // console.log(req);
        res.send('Upload is succesful!');
      }
    })
});

router.get('/edit/:asset_id', function (req, res) {
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