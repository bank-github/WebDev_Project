
getList();


// all asset
async function getList() {
  // use when error or success
  const info = document.querySelector('#info');

  try {
    const result = await fetch('/user/profile-info');
    console.log('Server Response:', result);

    if (result.ok) {
      const data = await result.json();
      let content = '';

      if (data.length > 0) {
        const inform = data[1]; 
        content = `
        <div class="row">
                <div class="col-md-8">
                    <h2 class="per-head">Personal Information</h2>
                    <div class="avatar text-center">
                        <img src="/public/img/Avatar.png" alt="User Avatar" class="rounded-circle">
                    </div>
                </div>
                <div class="container">
                    <div class="col-md-4 rounded-info ">
                        <h3 class="user">Name :  <span id="Name">${inform.name}</span></h3>
                        <h3 class="school">Major : <span id="School">${inform.major}</span></h3>
                        <h3 class="mail">E-mail :  <span id="userEmail">${inform.email}</span></h3>
                        <h3 class="tel"> Tel. : <span id="Tel">${inform.tel}</span></h3>
                        <button class="bx bx bx-edit icon icon" id="edit-info-btn" onclick="editProfileInformation()">Edit</button>
                    </div>
                </div>
            </div>
        `;
      }

      info.innerHTML = content;
    } else {
      const data = await result.text();
      info.innerHTML = data;
    }
  } catch (err) {
    console.error(err);
  }
}
let userData = {
  Name: '',
  School: '',
  Email: '',
  Tel: ''
};

function editProfileInformation() {
  Swal.fire({
    title: 'Edit Profile Information',
    html: `
      <input id="Name" class="swal2-input" placeholder="Name" value="${userData.Name}">
      <input id="School" class="swal2-input" placeholder="School" value="${userData.School}">
      <input id="Email" class="swal2-input" placeholder="Email" value="${userData.Email}">
      <input id="Tel" class="swal2-input" placeholder="Tel" value="${userData.Tel}">
    `,
    showCancelButton: true,
    confirmButtonText: 'Save',
  }).then((result) => {
    if (result.isConfirmed) {
      userData.Name = document.getElementById("Name").value;
      userData.School = document.getElementById("School").value;
      userData.Email = document.getElementById("Email").value;
      userData.Tel = document.getElementById("Tel").value;

      // Send the updated data to the server (you'll need to implement this)
      saveProfileInformation(userData);

      // Display updated information to the user
      Swal.fire({
        title: 'Updated Profile Information',
        html: `
          <h3>Name: ${userData.Name}</h3>
          <h3>School: ${userData.School}</h3>
          <h3>Email: ${userData.Email}</h3>
          <h3>Telephone: ${userData.Tel}</h3>
        `,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }
  });
}

// // Initial update
// updateUserInfo();