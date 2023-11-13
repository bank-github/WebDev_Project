const express = require('express');
const router = express.Router();
const con = require('../config/db');

router.get('/assets', function (req, res) {
    const sql = `SELECT * FROM assets`;
    con.query(sql, function (err, result) {
        if (err) {
            return res.status(500).send('<h1>Database Error!</h1>');
        }
        res.status(200).send(result);
    })
});
router.post('/add-assets',function (req,res){
    const asset_id = req.params.asset_id;
    const update = req.body;
    const query = `INSERT INTO assets SET asset_name = ?,detail=?,status = 1,image = ? `; 
    con.query(query, [update.asset_name,update.detail,update.image] , function (err,result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Database server error');
        }else if(result.affectedRows != 1){
            console.error('Row update is not 1');
            return res.status(500).send('Update failed');

        }else{
            res.send('Update succesfully');
        }
        
    })
})



module.exports = router;