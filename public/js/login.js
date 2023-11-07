const formLogin = document.querySelector("#formLogin");

// when submit form
formLogin.onsubmit = async function (e) {
  // alert('ok')
  e.preventDefault();
  const email = formLogin["txtemail"].value;
  const password = formLogin["txtpassword"].value;
  // console.log(username, password);

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
      location.replace(data);
      // Notiflix.Report.success("Success", data, "OK");
    } else if (response.status == 401) {
      const data = await response.text();
      throw Error(data);
    } else {
      throw Error("Connection error");
    }
  } catch (err) {
    console.error(err.message);
    // alert(err.message);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.message
    });
  }
};
