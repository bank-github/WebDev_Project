const form = document.querySelector('formLogin');
formLogin.onsubmit = async function (e) {
    e.preventDefault();
    const email= formLogin["email"].value;
    const password = formLogin["password"].value;
    // console.log(email, password);
    try {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password }),
  };
  const response = await fetch("/admin/login", options);
  if (response.ok) {
    const data = await response.text();
   if (data == 'Login success') {
    localStorage.setItem('auth_admin',1);
    window.location.replace('/admin/main');

   }
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
    text:err.message,
    color:'#D65A0F',
    background: '#FFE6C7',
    confirmButtonColor: '#D65A0F',
  });
}
};