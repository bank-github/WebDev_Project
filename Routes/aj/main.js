const express = require('express');
const router = express.Router();
const path = require('path');

// go to main page
router.get('/main', function (req, res) {
    res.sendFile(path.join(__dirname, "../../views/aj/main.html"));
});

module.exports = router;