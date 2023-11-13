const express = require('express');
const router = express.Router();
const path = require('path');
const con = require('../../config/db');

router.get('/history',function(req,res){
    if(req.session.role =='0'){
        res.sendFile(path.join(__dirname,'../../views/user/history.html'));
    }
    else{
        res.redirect('/login');
    }
})

router.get('/history-info', function (req, res) {
    const sql = `SELECT * FROM borrow`;
    con.query(sql,function(err,result){
        if(err){
            return res.status(500).send('<h1>Database Error!</h1>');
        }
        res.status(200).send(result);
    })
});

module.exports = router;