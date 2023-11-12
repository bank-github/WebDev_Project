const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../../config/db');

// go to main page
router.get('/list', function (req, res) {
  res.sendFile(path.join(__dirname, "../../views/aj/list.html"));
});




module.exports = router;