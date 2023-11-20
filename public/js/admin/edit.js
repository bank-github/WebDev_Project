const modeswitch = document.querySelector('.toggle-switch');
const span = document.querySelector('#switch');
const asset_id = sessionStorage.getItem('edit-id');
var asset = [];
var mode = 0;



modeswitch.addEventListener('click', () => {
  span.classList.toggle("switch-off");
  if (span.className == 'switch-on switch-off') {
    // alert(span.className);
    mode = 0;
  } else {
    // alert(span.className);
    mode = 1;
  }
  // alert(mode);
});


async function getdata() {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }
  try {
    const response = await fetch(`/admin/edit/${asset_id}`, options);
    if (response.ok) {
      asset = await response.json();
      if (asset) {
        showData();
      } else {
        location.replace('/admin/list')
      }
    }
    else {
      throw Error('Connection error'); ``
    }
  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }
}

function showData() {
  console.log(asset);;
  const reader = new FileReader();
  var name = document.querySelector('#edit-name');
  var photo = document.querySelector('#edit-photo');
  var detail = document.querySelector('#edit-detail');
  let sendData = { 'asset_name': asset[0].asset_name, 'detail': asset[0].detail, 'asset_status': asset[0].asset_status, 'image': { "name": asset[0].image } };
  name.innerHTML = asset[0].asset_name;
  name.onclick = async function () {
    const { value: inputname } = await Swal.fire({
      color: "#FFE6C7",
      input: "text",
      background: "#454545",
      inputLabel: `${asset[0].asset_name}`,
      inputPlaceholder: "Type new asset name here...",
      confirmButtonColor: "#D65A0F",
      confirmButtonText: "OK!",
      showClass: {
        // ? amimation from package animate.css 
        popup: `
          animate__animated
          animate__fadeInDown
          animate__faster
          `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutUp
          animate__faster
          `
      },
      showCancelButton: true
    });
    if (inputname) {
      sendData.asset_name = inputname;
      name.innerHTML = inputname;
    }
  }
  photo.src = `/public/img/${asset[0].image}`;
  photo.onclick = async function () {
    const { value: file } = await Swal.fire({
      title: "Select image",
      input: "file",
      background: "#454545",
      confirmButtonColor: "#D65A0F",
      confirmButtonText: "OK!",
      color: "#FFE6C7",
      inputAttributes: {
        "accept": "image/*",
        "aria-label": "Upload your profile picture"
      },

      showClass: {
        // ? amimation from package animate.css 
        popup: `
          animate__animated
          animate__fadeInDown
          animate__faster
          `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutUp
          animate__faster
          `
      },
    });
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(e);
        photo.src = e.target.result;
      };
      sendData.image = file;
      reader.readAsDataURL(file);
    }
  }

  detail.innerHTML = asset[0].detail;
  detail.onclick = async function () {
    const { value: inputdetail } = await Swal.fire({
      input: "textarea",
      inputLabel: "Detail",
      inputPlaceholder: "Type your detail here...",
      inputAttributes: {
        "aria-label": "Type your detail here"
      },
      background: "#454545",
      confirmButtonColor: "#D65A0F",
      confirmButtonText: "OK!",
      color: "#FFE6C7",
      showCancelButton: true,
      showClass: {
        // ? amimation from package animate.css 
        popup: `
          animate__animated
          animate__fadeInDown
          animate__faster
          `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutUp
          animate__faster
          `
      },
    });
    if (inputdetail) {
      sendData.detail = inputdetail;
      detail.innerHTML = inputdetail;
    }
  }

  console.log(asset[0].asset_status);

  // !change switch when already asset_status == 0  
  if (asset[0].asset_status == 0) {
    span.classList.toggle("switch-off");
    mode = 0;
  } else {
    // span.classList.toggle("switch-on");
    mode = 1;
  }

  document.querySelector('#confirm').onclick = function () {
    Swal.fire({
      title: 'ARE YOU SURE?',
      color: '#D65A0F',
      icon: 'warning',
      background: '#FFE6C7',
      showCancelButton: true,
      confirmButtonColor: '#D65A0F',
      cancelButtonColor: '#454545',
      confirmButtonText: 'Yes'
      , cancelButtonText: 'No',
      showClass: {
        // ? amimation from package animate.css 
        popup: `
          animate__animated
          animate__fadeInDown
          animate__faster
          `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutUp
          animate__faster
          `
      },
    }).then((result) => {
      if (result.isConfirmed) {
        sendData.asset_status = mode;
        console.log(sendData.image.name);
        console.log(sendData.asset_name);
        console.log(sendData.detail);
        console.log(sendData.asset_status);
        updateAsset(sendData);
        if (sendData.image.name != asset[0].image) {
          uploadimage(sendData.image);
        }
        // window.location.replace('/admin/list');
      }
    });
    // console.log('Test');
  }

  document.querySelector('#delete-button').onclick = function () {
    Swal.fire({
      title: 'ARE YOU SURE?',
      color: '#D65A0F',
      icon: 'warning',
      background: '#FFE6C7',
      showCancelButton: true,
      confirmButtonColor: '#D65A0F',
      cancelButtonColor: '#454545',
      confirmButtonText: 'Yes'
      , cancelButtonText: 'No',
      showClass: {
        // ? amimation from package animate.css 
        popup: `
          animate__animated
          animate__fadeInDown
          animate__faster
          `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutUp
          animate__faster
          `
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(sendData.image.name);
        // console.log(sendData.image.name);
        deleteasset(sendData.image.name)
        // window.location.replace('/admin/list');
      }
    });
    // console.log('Test');
  }

}

async function uploadimage(image) {
  try {
    const formData = new FormData();
    formData.append('filetoupload', image);
    const option = {
      method: 'POST',
      body: formData
    }
    const response = await fetch('/admin/uploading', option);
    if (response.ok) {
      const data = await response.text();
      // Swal.fire({
      //   position: "top-end",
      //   icon: "success",
      //   title: "Update succesfully and "+data,
      //   showConfirmButton: false,
      //   timer: 1500
      // });          

      // alert(data);
    } else {
      throw Error('Upload error');
    }
  } catch (error) {
    console.error(error);
    alert(error.message)
  }
}

async function updateAsset(sendData) {
  const url = `/assets/${asset_id}`;
  // let data = '';
  const options = {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "asset_name": sendData.asset_name,
      "detail": sendData.detail,
      "asset_status": sendData.asset_status,
      "image": sendData.image.name
    })
  };
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.text();
      Swal.fire({
        color: '#D65A0F',
        background: '#FFE6C7',
        position: "center",
        icon: "success",
        title: data,
        showConfirmButton: false,
        timer: 1500,
        showClass: {
          // ? amimation from package animate.css 
          popup: `
                animate__animated
                animate__fadeInDown
                animate__faster
                `
        },
        hideClass: {
          popup: `
                animate__animated
                animate__fadeOutUp
                animate__faster
                `
        },
      })
        .then(function (value) {
          location.replace('/admin/list');
        }
        );
      // alert(data);

    } else {
      throw Error('Connection error');
    }
  } catch (error) {
    console.error(error.message);
    alert(error.message)
  }
}

async function deleteasset(photoname) {
  console.log(photoname);
  const options = {
    method: 'DELETE',
    body: JSON.stringify({
      'photoname': photoname
    })
  }
  try {
    const response = await fetch(`/assets/${asset_id}`, options);
    if (response.ok) {
      const data = await response.text();
      Swal.fire({
        color: '#D65A0F',
        background: '#FFE6C7',
        position: "center",
        icon: "success",
        title: data,
        showConfirmButton: false,
        timer: 1500,
        showClass: {
          // ? amimation from package animate.css 
          popup: `
              animate__animated
              animate__fadeInDown
              animate__faster
              `
        },
        hideClass: {
          popup: `
              animate__animated
              animate__fadeOutUp
              animate__faster
              `
        },
      })
        .then(function (value) {
          location.replace('/admin/list');
        }
        );
      // alert(data);

    } else {
      throw Error('Connection error');
    }
  } catch (error) {
    console.error(error.message);
    alert(error.message)
  }
}






getdata();