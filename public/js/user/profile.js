async function getList() {
  const info = document.querySelector('#info');

  try {
    const result = await fetch('/user/profile-info');
    console.log('Server Response:', result);

    if (result.ok) {
      const data = await result.json();
      let content = '';

      if (data) { 
        content = `
          <div class="row">
            <div class="col-md-8">
              <h2 class="per-head">Personal Information</h2>
              <div class="avatar text-center">
                <img src="/public/img/Avatar.png" alt="User Avatar" class="rounded-circle">
              </div>
            </div>
            <div class="container">
              <div class="col-md-4 rounded-info">
                <h3 class="user">Name: <span id="Name">${data.name}</span></h3>
                <h3 class="school">Major: <span id="School">${data.major}</span></h3>
                <h3 class="mail">E-mail: <span id="userEmail">${data.email}</span></h3>
                <h3 class="tel">Tel.: <span id="Tel">${data.tel}</span></h3>
                <button class="bx bx-edit icon icon" id="edit-info-btn" onclick="editUserProfile()">Edit</button>
              </div>
            </div>
          </div>
        `;
      }

      info.innerHTML = content;
    } else {
      const errorText = await result.text();
      info.innerHTML = errorText;
    }
  } catch (err) {
    console.error(err);
  }
}

const editUserProfile = async () => {
  // You can use the fetched data from getList() to pre-fill the form
  const data = await fetch('/user/profile-info').then(response => response.json());

  const { value: formValues } = await Swal.fire({
    title: 'Edit Profile Information',
    html: `
      <input id="Name" class="swal2-input" placeholder="Name" value="${data.name}">
      <input id="School" class="swal2-input" placeholder="Major" value="${data.major}">
      <input id="Email" class="swal2-input" placeholder="Email" value="${data.email}">
      <input id="Tel" class="swal2-input" placeholder="Tel" value="${data.tel}">
    `,
    showCancelButton: true,
    confirmButtonText: 'Save',
    focusConfirm: false,
    preConfirm: () => {
      return {
        name: document.getElementById('Name').value,
        major: document.getElementById('School').value,
        email: document.getElementById('Email').value,
        tel: document.getElementById('Tel').value,
      };
    },
  });

  if (formValues) {
    // Send the updated data to the server (you'll need to implement this)
    // You can make a fetch request to update the user data in your database here

    // Update the user data locally (for demonstration purposes)
    data.name = formValues.name;
    data.major = formValues.major;
    data.email = formValues.email;
    data.tel = formValues.tel;

    // Display updated information to the user
    Swal.fire({
      title: 'Updated Profile Information',
      html: `
        <h3>Name: ${data.name}</h3>
        <h3>Major: ${data.major}</h3>
        <h3>Email: ${data.email}</h3>
        <h3>Telephone: ${data.tel}</h3>
      `,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }
}

// Call the function when you want to display the user profile
getList();
