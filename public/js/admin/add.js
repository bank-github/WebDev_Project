// const modeswitch = document.querySelector('.toggle-switch');
const span = document.querySelector('#switch');
// var asset = [];
var mode = 1;

// modeswitch.addEventListener('click',()=>{
//     span.classList.toggle("switch-off");
//     if (span.className == 'switch-on switch-off') {
//       // alert(span.className);
//       mode = 0;
//     } else {
//       // alert(span.className);
//       mode = 1;
//     }
//     alert(mode);
// });


function showData() {
  const reader = new FileReader();
  var name = document.querySelector('#edit-name');
  var photo = document.querySelector('#edit-photo');
  var detail = document.querySelector('#edit-detail');
  let sendData = { 'asset_name': '', 'detail': '', 'asset_status': 1, 'image': { "name": '' } };
  name.onclick = async function () {
    const { value: inputname } = await Swal.fire({
      color: "#FFE6C7",
      input: "text",
      background: "#454545",
      inputLabel: `Name`,
      inputPlaceholder: "Type new asset name here...",
      confirmButtonColor: "#D65A0F",
      confirmButtonText: "OK!",
      inputValidator: (value) => {
        if (!value) {
          return "You need to write name !";
        }
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
      showCancelButton: true
    });
    if (inputname) {
      sendData.asset_name = inputname;
      name.innerHTML = inputname;
    }
  }
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
      },inputValidator: (value) => {
        if (!value) {
          return "You need to input image!";
        }
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
       // ? Get the current timestamp
       const timestamp = Date.now();

      // ? Append the timestamp to the original file name
      const editedFileName = `${timestamp}_${file.name}`;

      reader.onload = (e) => {
        console.log(e);
        photo.src = e.target.result;
      };


      sendData.image = new File([file], editedFileName, { type: file.type });
      reader.readAsDataURL(file);
    }
  }

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
      inputValidator: (value) => {
        if (!value) {
          return "You need to write detail !";
        }
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
    if (inputdetail) {
      sendData.detail = inputdetail;
      detail.innerHTML = inputdetail;
    }
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
        addAsset(sendData);
      }
    });
    // console.log('Test');
  }
  

}

showData();

async function uploadimage(image) {
  try {
    const formData = new FormData();
    formData.append('filetoupload', image);
    const option = {
      method: 'POST',
      body: formData
    } 
    const response = await fetch('/uploading', option);
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

      // ! go back to list 
      location.replace('/admin/assetlist');
    } else {
      throw Error('Upload error');
    }
  } catch (error) {
    console.error(error);
    alert(error.message)
  }
}

async function addAsset(sendData) {
  const url = `/add-assets`;
  // let data = '';
  const options = {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "asset_name": sendData.asset_name,
      "detail": sendData.detail,
      "image":  sendData.image.name
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
          uploadimage(sendData.image);
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

