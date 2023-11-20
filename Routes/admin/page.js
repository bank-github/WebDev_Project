const express = require('express');
const router = express.Router();
const path = require('path');

// dashboard page
router.get('/dashboard', function (req, res) {
    if (req.session.role == '2') {
        res.sendFile(path.join(__dirname, '../../views/admin/dashboard.html'));
    }
    // else if(req.session.role == '0'){
    //     res.redirect('/user/main');
    // }
    // else if(req.session.role == '1'){
    //     res.redirect('/aj/main');
    // }
    else {
        res.redirect('/login');
    }
});

// return asset page
router.get('/return', function (req, res) {
    if (req.session.role == '2') {
        res.sendFile(path.join(__dirname, '../../views/admin/return.html'))
    } else {
        res.redirect('/login');
    }
});

// borrow list page
router.get('/assetlist', function (req, res) {
    if (req.session.role == '2') {
        res.sendFile(path.join(__dirname, '../../views/admin/assetlist.html'))
    } else {
        res.redirect('/login');
    }
});

// history page
router.get('/history', function (req, res) {
    if (req.session.role == '2') {
        res.sendFile(path.join(__dirname, '../../views/admin/history.html'));
    } else {
        res.redirect('/login');
    }
});

// edit page
router.get('/edit', function (req, res) {
    if (req.session.role == '2') {
        res.sendFile(path.join(__dirname, '../../views/admin/edit.html'))
    } else {
        res.redirect('/login');
    }
});

// add page
router.get('/add', function (req, res) {
    if (req.session.role == '2') {
        res.sendFile(path.join(__dirname, '../../views/admin/add.html'))
    } else {
        res.redirect('/login');
    }
});

module.exports = router