const formLogin = document.querySelector("#formLogin");
      formLogin.onsubmit = async function (e) {
        // alert('ok')
        e.preventDefault();
        const email= formLogin["txtemail"].value;
        const password = formLogin["txtpassword"].value;

        // console.log(username, password);
        try {
          const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: password }),
          };
          const response = await fetch("/login", options);
          if (response.ok) {
            const data = await response.text();
            // alert(data);
            // ----- check role ----- 
            // ----- 0 => aj ----- 
            // ----- 1 => user ----- 
            if (data == '0') {
              window.location.replace('/aj/main');
              localStorage.setItem('auth_user',1);
            } else {
              window.location.replace('/user/main');
              localStorage.setItem('auth_user',1);
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
            text:err.message
          });
        }
      };