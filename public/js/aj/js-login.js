const users = [
    { "id": 1, "username": "admin", "password": "1111", "role": 1 },
    { "id": 2, "username": "aaa", "password": "2222", "role": 2 }, 
    { "id": 3, "username": "bbb", "password": "333", "role": 2 }];

const modalLogin = new bootstrap.Modal(document.querySelector('#modalLogin'));

modalLogin.show();

document.querySelector('#btnSignIn').onclick = function () {
    const username = document.querySelector('#txtUsername').value;
    const password = document.querySelector('#txtPassword').value;   

    let userAuth = null;

    for (const user of users) {
        if (user.username === username && user.password === password) {
            userAuth = user;
            break;
        }
    }
    if (userAuth) {
        Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: `${userAuth.username} logged in!`,
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'asset.html'; 
            }
        });
    } else {
        
        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid username or password',        
        });
    }
    modalLogin.show();
}
