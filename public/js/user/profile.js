
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
