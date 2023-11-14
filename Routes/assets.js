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

router.delete('/assets/:id', function (req, res) {
    const id = req.params.id;
    const sqlbr = `DELETE FROM borrow WHERE asset_id = ?`;
    con.query(sqlbr, [id], function (err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Database Error!');
        }
        const sql = `DELETE FROM assets WHERE asset_id = ?`;
        con.query(sql, [id], function (err, result) {
            if (err) {
                console.error(err);
                return res.status(500).send('Database Error!');
            }
            res.send('Deleted!');
        })
    })
})
router.put('/assets/:id', function (req, res) {
    const asset_id = req.params.id;
    // res.send(asset_id)
    const { asset_name, detail, asset_status, image } = req.body;
    const sql = "UPDATE assets SET asset_name = ?, detail = ?, asset_status = ?, image = ? WHERE assets.asset_id = ? ;"
    con.query(sql, [asset_name, detail, asset_status, image, asset_id], function (err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Database server error');
        } else if (result.affectedRows != 1) {
            console.error('Row update is not 1');
            return res.status(500).send('Update failed');
        } else {
            res.send('Update succesfully');
        }
    });

});
router.post('/assets',function (req,res){
    const update = req.body;
    const query = `INSERT INTO assets SET asset_name = ?,detail=?,asset_status = 1,image = ? `; 
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
});


module.exports = router;