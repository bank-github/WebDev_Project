const express = require('express');
const path = require('path');
const session = require('express-session');
// const bcrypt = require('bcrypt');

                // router \\
const authen = require('./Routes/authen');
const assets = require('./Routes/assets');
const profile = require('./Routes/profile');
const borrows = require('./Routes/borrows');
//=== user===\\
const pageUser = require('./Routes/user/page');

//=== aj ===\\
const pageAJ = require('./Routes/aj/page');

//=== admin ===\\
const pageAdmin = require('./Routes/admin/page');

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
}));

// loginUser
app.use(authen); //all user authen functon
app.use(assets); // all function assets
app.use(profile); // all function user
app.use(borrows); // all funcion borrow

//===========user============\\
app.use('/user',pageUser); // api all page

//=============aj==========\\
app.use('/aj',pageAJ);

// ============ admin ===========\\
app.use('/admin',pageAdmin);

// root file
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