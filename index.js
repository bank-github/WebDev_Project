const express = require('express');
const path = require('path');
const session = require('express-session');
// const bcrypt = require('bcrypt');

                // router \\
const login = require('./Routes/login');
//=== user===\\
const forgotUser = require('./Routes/user/forgot');
const repassUser = require('./Routes/user/repass');
const registerUser = require('./Routes/user/register');
const mainUser = require('./Routes/user/main');
const listUser = require('./Routes/user/list');
const messageUser = require('./Routes/user/message');
const profileUser = require('./Routes/user/profile');
const historyUser = require('./Routes/user/history');
const borrowUser = require('./Routes/user/borrow');

//=== aj ===\\
const mainAj = require('./Routes/aj/main');
const borrowAj = require('./Routes/aj/borrow');
const messageAj = require('./Routes/aj/message');
const profileAj = require('./Routes/aj/profile');
const historyAj = require('./Routes/aj/history');
const listAj = require('./Routes/aj/list');

//=== admin ===\\
const loginAdmin = require('./Routes/admin/login')
const mainAdmin = require('./Routes/admin/main');

const app = express();
// set public path
app.use("/public", express.static(path.join(__dirname, "public")));
// json exchange
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// session
app.use(session({
    cookie: {maxAge: 24*60*60*1000},
    secret: 'WebdevProject',
    resave: false,
    saveUninitialized: true
}))

// loginUser
app.use(login) //user login

//===========user============\\
app.use('/user', forgotUser); //user forgot password
app.use('/user', repassUser); // user repassword
app.use('/user', registerUser); //user register
app.use('/user', mainUser) // main page
app.use('/user', listUser) // list page
app.use('/user', messageUser) // message page
app.use('/user', profileUser) // profile page
app.use('/user', historyUser) // history page
app.use('/user', borrowUser) // borrow page

//=============aj==========\\
app.use('/aj',mainAj);
app.use('/aj',borrowAj) // borrow page
app.use('/aj',messageAj)// message page
app.use('/aj',profileAj) // profile page
app.use('/aj',historyAj) // history page
app.use('/aj',listAj) // list page


// ============ admin ===========\\
app.use('/admin', mainAdmin)

// logout and destroy session
app.get('/logout',function(req,res){
    req.session.destroy(function(err,){
        if(err){
            console.error(err);
            res.status(500).send('Cannot logout');
        }else{
            res.redirect('/');
        }
    })
})
// root file user
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "views/landing.html"));
});

// app.get('/hash/:pass', function (req, res) {
//     bcrypt.hash(req.params.pass, 10, function (err, hash) {
//         if (err) {
//             return res.status(500).send('Hash error')
//         }
//         res.send(hash);
//     })
// })

// run server
const port = 7777;
app.listen(port, function () {
    console.log("Server is ready at ", port);
});