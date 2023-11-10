const express = require('express');
const router = express.Router();
const path = require('path');

// go to borrow page
router.get('/borrow', function (req, res) {
    res.sendFile(path.join(__dirname, "../../views/aj/borrow.html"));
});

module.exports = router;