const express = require('express');
const router = express.Router();
const path = require('path');
const con = require('../../config/db');

router.get('/list',function(req,res){
    res.sendFile(path.join(__dirname,'../../views/user/list.html'));
})

router.get('/list-all', function (req, res) {
    const sql = `SELECT * FROM borrow assets`;
    con.query(sql,function(err,result){
        if(err){
            return res.status(500).send('<h1>Database Error!</h1>');
        }
        res.status(200).send(result);
    })
});

module.exports = router;