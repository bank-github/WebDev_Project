// get all asset
async function getList() {
  const info = document.querySelector('#info');
  try {
    const result = await fetch('/profile');
    // localStorage.setItem("userId",data);
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
              <h3 class="tel"> Tel. : <span id="Tel">${data[0].tel_phone}</span></h3>
              <button class="bx bx bx-edit icon icon" id="edit-info-btn" onclick="editUserProfile()">Edit</button>
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
  try {
    const response = await fetch('/profile');
    const data = await response.json();
    const userId = data[0].user_id;

    const result = await Swal.fire({
      title: 'Edit Profile Information',
      html: `
        <div class="container">
        <div class="row">
          <form class="d-flex flex-column justify-content-center" id="formInput">
          <div class="form-floating">
          <input class="form-control mb-3 border-2 border-black rounded-pill shadow" type="text" id="Name" name="txtname"
            placeholder="${data[0].name}" value="${data[0].name}" required>
          <label class="ms-3 fw-bold" for="txtname">Name</label>
        </div>
        <div class="form-floating">
          <input class="form-control mb-3 border-2 border-black rounded-pill shadow" type="text" id="Tel" name="txtphone"
            placeholder="${data[0].tel_phone}" maxlength="10" minlength="10" pattern="[0-9]{10}" title="Format (0xxxxxxxxx)"
            value="${data[0].tel_phone}" required>
          <label class="ms-3 fw-bold" for="txtphone">Phone Number</label>
        </div>
        <div>
          <label class="fw-bold my-5" for="slcMajor">Major</label>
          <select class="border-2 border-black shadow" id="School" name="Major" value="${data[0].major}" required>
            <option value="CE">Computer Engineer</option>
            <option value="SE">Software Engineer</option>
            <option value="MTA">MTA</option>
          </select>
        </div>
          </form>
        </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Save',
      focusConfirm: false,
      preConfirm: () => {
        return {
          name: formInput.elements['txtname'].value,
          major: formInput.elements['Major'].value,
          tel: formInput.elements['txtphone'].value,
        };
      },
    });
    try {
      if (result.isConfirmed) {
        const formInput = document.getElementById('formInput');
        data[0].name = formInput.elements['txtname'].value;
        data[0].major = formInput.elements['Major'].value;
        data[0].tel_phone = formInput.elements['txtphone'].value;

        const options = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data[0].name,
            major: data[0].major,
            tel: data[0].tel_phone,
          }),
        }
        const updateResponse = await fetch(`/profile/${userId}`, options);
        if (updateResponse.ok) {
          Swal.fire({
            title: 'Updated Profile Information',
            html: `
            <h3>Name: ${data[0].name}</h3>
            <h3>Major: ${data[0].major}</h3>
            <h3>Telephone: ${data[0].tel_phone}</h3>
          `,
            icon: 'success',
            confirmButtonText: 'OK',
          });
          getList();
        } else {
          console.error('Error updating profile:', updateResponse.status, updateResponse.statusText);
          Swal.fire({
            title: 'Error',
            text: 'Failed to update profile information. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      }
    } catch (error) {
      console.error('An error occurred during the update:', error);
    }
  } catch (error) {
    console.error('An error occurred while fetching profile data:', error);
  }
};

// logout function
function logout() {
  Swal.fire({
    title: 'Do you want to sign out',
    color: '#FFA559',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FFA559',
    cancelButtonColor: '#FFE6C7',
    cancelButtonText: 'Cancel',
    confirmButtonText: 'Sure'

  }).then((result) => {
    if (result.isConfirmed) {
      window.localStorage.clear();
      window.location.replace('/logout');
    }
  });
}


getList();
