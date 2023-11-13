async function getList() {
  const info = document.querySelector('#info');

  try {
    const result = await fetch('/profile');
    if (result.ok) {
      const data = await result.json();
      let content = `<div class="row">
      <div class="col-md-8">
          <h2 class="per-head">Personal Information</h2>
          <div class="avatar text-center">
              <img src="/public/img/Avatar.png" alt="User Avatar" class="rounded-circle">
          </div>
      </div>
      <div class="container">
          <div class="col-md-4 rounded-info ">
              <h3 class="user">Name :  <span id="Name">${data[0].name}</span></h3>
              <h3 class="school">Major : <span id="School">${data[0].major}</span></h3>
              <h3 class="mail">E-mail :  <span id="userEmail">${data[0].email}</span></h3>
              <h3 class="tel"> Tel. : <span id="Tel">${data[0].tel}</span></h3>
              <button class="bx bx bx-edit icon icon" id="edit-info-btn" onclick="editProfileInformation()">Edit</button>
          </div>
      </div>
  </div>`;

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
    
    data.name = formValues.name;
    data.major = formValues.major;
    data.email = formValues.email;
    data.tel = formValues.tel;

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


getList();
