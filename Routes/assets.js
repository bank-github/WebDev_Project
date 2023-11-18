const express = require('express');
const router = express.Router();
const con = require('../config/db');
// remove image
const fs = require('fs/promises');

router.get('/assets', function (req, res) {
    const sql = `SELECT * FROM assets`;
    con.query(sql, function (err, result) {
        if (err) {
            return res.status(500).send('<h1>Database Error!</h1>');
        }
        res.status(200).send(result);
    })
});

router.put('/assets/:id',function (req,res) {
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
router.delete('/assets/:id', function (req, res) {
    const id = req.params.id;
    const { photoname } = req.body;
    console.log(photoname);
    const sqlbr = `DELETE FROM borrow WHERE asset_id = ?`;
    con.query(sqlbr, [id], function (err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Database Error!');
        }
        const sql = `DELETE FROM assets WHERE asset_id = ?`;
        con.query(sql, [id], async function (err, result) {
            if (err) {
                console.error(err);
                return res.status(500).send('Database Error!');
            }
            res.send('Deleted!');

            // Specify the path to your files
            const filePath = `./public/img/${photoname}`;
            // Delete the file
            // console.log(filePath);
            await fs.unlink(filePath);

        })
    })
});

router.post('/add-assets',function (req,res){
    const { asset_name , detail , asset_status ,image} = req.body;
    const query = `INSERT INTO assets SET asset_name = ?,detail=?,asset_status = ?,image = ? `; 
    con.query(query, [asset_name,detail,asset_status,image] , function (err,result) {
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