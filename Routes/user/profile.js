const express = require('express');
const router = express.Router();
const path = require('path');
const con = require('../../config/db');

router.get('/profile',function(req,res){
    res.sendFile(path.join(__dirname,'../../views/user/profile.html'));
})
router.get('/profile/:id', function (req, res) {
    const sql = `SELECT name, email, user_id, major,tel FROM user`;
    const id = req.params.id;
    con.query(sql,[id],function(err,result){
        if(err){
            return res.status(500).send('<h1>Database Error!</h1>');
        }
        res.status(200).send(result);
    })
});



module.exports = router;