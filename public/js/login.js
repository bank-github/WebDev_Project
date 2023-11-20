const formLogin = document.querySelector("#formLogin");

// when submit form
formLogin.onsubmit = async function (e) {
  e.preventDefault();
  const email = formLogin["txtemail"].value;
  const password = formLogin["txtpassword"].value;

  const data = {
    email: email,
    password: password
  }

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch("/login", options);
    if (response.ok) {
      const data = await response.text();
      window.localStorage.setItem('userID',data);
      window.location.replace('/user/assetlist');
    } else if (response.status == 401) {
      const data = await response.text();
      throw Error(data);
    } else {
      throw Error("Connection error");
    }
  } catch (err) {
    console.error(err.message);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.message
    });
  }

};

// go to Landing
function goLanding() {
  window.location.replace('/');
}

// go to Register
function goRegister() {
  window.location.replace('/user/register');
}

// go to Repassword
function goForgot() {
  window.location.replace('/user/forgot');
}
