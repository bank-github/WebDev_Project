const express = require('express');
const app = express();
const path = require('path');
// const bcrypt = require('bcrypt');

               // router \\
const login = require('./Routes/login');
//=== user===\\
const forgotUser = require('./Routes/user/forgot');
const repassUser = require('./Routes/user/repass');
const registerUser = require('./Routes/user/register');
const mainUser = require('./Routes/user/main');

//=== aj ===\\
const mainAj = require('./Routes/aj/main');
//=== admin ===\\
const mainAdmin = require('./Routes/admin/main');
const listAdmin = require('./Routes/admin/list');

// set public path
app.use("/public", express.static(path.join(__dirname, "public")));

// json exchange
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// loginUser
app.use(login) //user login

//===========user============\\
app.use('/user',forgotUser); //user forgot password
app.use('/user',repassUser); // user repassword
app.use('/user',registerUser); //user register
app.use('/user',mainUser) // main page

//=============aj==========\\
app.use('/aj',mainAj);

// ============ admin ===========\\
app.use('/admin',mainAdmin)
app.use('/admin',listAdmin)

// root file user
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "views/login.html"));
});

// run server
const port = 7777;
app.listen(port, function () {
    console.log("Server is ready at ", port);
});