const express = require('express');
const router = express.Router();
const path = require('path');

// dashboard page
router.get('/dashboard', function (req, res) {
    if (req.session.role == '1') {
        res.sendFile(path.join(__dirname, "../../views/aj/dashboard.html"));
    }
    else {
        res.redirect('/login');
    }
});

// asset list page
router.get('/assetlist', function (req, res) {
    if (req.session.role == '1') {
        res.sendFile(path.join(__dirname, "../../views/aj/assetlist.html"));
    } else {
        res.redirect('/login');
    }
});

// request page
router.get('/request', function (req, res) {
    if (req.session.role == '1') {
        res.sendFile(path.join(__dirname, "../../views/aj/request.html"));
    } else {
        res.redirect('/login');
    }
});

// profile page
router.get('/profile', function (req, res) {
    if (req.session.role == '1') {
        res.sendFile(path.join(__dirname, "../../views/aj/profile.html"));
    } else {
        res.redirect('/login');
    }
});

//   history page
router.get('/history', function (req, res) {
    if (req.session.role == '1') {
        res.sendFile(path.join(__dirname, "../../views/aj/history.html"));
    } else {
        res.redirect('/login');
    }
});

module.exports = router;