const express = require('express');
const router = express.Router();
const con = require('../config/db');
const upload = require('../config/uploadConfig');
// remove image
const fs = require('fs');

// get all asset data
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
})


// update asset
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

router.delete('/assets/:id', function (req, res) {
    const id = req.params.id;
    const { imagename } = req.body;
    // console.log(imagename);
    // res.send(imagename);
    const sqlbr = `DELETE FROM borrow WHERE asset_id = ?`;
    const imagePath = `./public/img/${imagename}`    ;

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
            fs.unlink(imagePath,(err)=>{
                if (err) {
                    console.error('Error deleting image: ', err);
                }else{
                    // console.log('Image deleted successfully.');
                    res.send('Image deleted successfully!');
                }
            });
        })
    })
});

router.post('/add-assets',function (req,res){
    const asset_id = req.params.asset_id;
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

// add photo asset to floder => public img
router.post('/uploading',function (req,res) {
    upload(req,res,function (err) {
      if (err) {
        console.log(err);
        res.status(500).send('Upload failed');
      }else{
        // console.log(req);
        res.send('Upload is succesful!');
      }
    })
})


module.exports = router;