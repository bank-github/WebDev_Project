const express = require('express');
const router = express.Router();
const path = require('path');

//register page 
router.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname, "../../views/user/register.html"));
});

// forgot page
router.get('/forgot', function (req, res) {
    res.sendFile(path.join(__dirname, '../../views/user/forgot.html'));
});

// repass page
router.get('/repass', function (req, res) {
    res.sendFile(path.join(__dirname, '../../views/user/repass.html'))
});

// asset list page
router.get('/assetlist', function (req, res) {
    if (req.session.role == '0') {
        res.sendFile(path.join(__dirname, "../../views/user/assetlist.html"));
    }
    else {
        res.redirect('/login');
    }
});

// status page
router.get('/status',function(req,res){
    if(req.session.role == '0'){
        res.sendFile(path.join(__dirname,'../../views/user/status.html'));
    }else{
        res.redirect('/login');
    }
})

// profile page
router.get('/profile',function(req,res){
    if(req.session.role =='0'){
        res.sendFile(path.join(__dirname,'../../views/user/profile.html'));
    }
    else{
        res.redirect('/login');
    }
})

// history page
router.get('/history',function(req,res){
    if(req.session.role =='0'){
        res.sendFile(path.join(__dirname,'../../views/user/history.html'));
    }
    else{
        res.redirect('/login');
    }
})

module.exports = router;