const express = require('express');
const path = require('path');
// const bcrypt = require('bcrypt');

// router
const login = require('./Routes/login');
//=== user===\\
const registerUser = require('./Routes/user/register');
const mainUser = require('./Routes/user/main');
//=== aj ===\\
const mainAj = require('./Routes/aj/main');
//=== admin ===\\
const loginAdmin = require('./Routes/admin/login')
const mainAdmin = require('./Routes/admin/main')

const app = express();
// set public path
app.use("/public", express.static(path.join(__dirname, "public")));

// json exchange
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// login
app.use(login) //user login
//===========user============\\
app.use('/user',registerUser); //user register
app.use('/user',mainUser) // main page

//=============aj==========\\
app.use('/aj',mainAj);

// ============ admin ===========\\
app.use('/admin',loginAdmin);
app.use('/admin',mainAdmin)
// root file
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "views/login.html"));
});

// run server
const port = 7777;
app.listen(port, function () {
    console.log("Server is ready at ", port);
});