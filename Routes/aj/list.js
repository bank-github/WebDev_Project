const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../../config/db');

// go to main page
router.get('/list', function (req, res) {
  if (req.session.role == '1') {
    res.sendFile(path.join(__dirname, "../../views/aj/list.html"));
  } else {
    res.redirect('/login');
  }
});
// get data
router.get('/list-getdata', function (req, res) {
  const query = `
    SELECT borrow.*, assets.*
    FROM borrow
    JOIN assets ON borrow.asset_id = assets.asset_id;
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



module.exports = router;