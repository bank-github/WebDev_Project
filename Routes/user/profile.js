const express = require('express');
const router = express.Router();
const path = require('path');
const con = require('../../config/db');
router.get('/profile',function(req,res){
    if(req.session.role =='0'){
        res.sendFile(path.join(__dirname,'../../views/user/profile.html'));
    }
    else{
        res.redirect('/login');
    }
})
// router.get('/profile-info', function (req, res) {
//     const sql = `SELECT * FROM user`;
//     con.query(sql,function(err,result){
//         if(err){
//             return res.status(500).send('<h1>Database Error!</h1>');
//         }
//         res.status(200).send(result);
//     })
// });

router.get('/profile-info', function (req, res) {
  const id = req.session.userID; // Fetch the user ID from the session
  const email = req.session.email;
  console.log('id', id, 'email', email);
  if (id && email) {
      const sql = 'SELECT * FROM user WHERE user_id = ?';
      con.query(sql, [id], function (err, result) {
          if (err) {
              console.error(err);
              return res.status(500).send('Database Error');
          }

          if (result.length === 0) {
              return res.status(404).send('User not found');
          }

          // Send the user data as a JSON response
          res.status(200).json(result[0]);
      });
  } else {
      res.redirect('/user/profile');
  }
});




module.exports = router;

