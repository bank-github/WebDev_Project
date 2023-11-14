const modeswitch = document.querySelector('.toggle-switch');
const span = document.querySelector('#switch');
const asset_id = sessionStorage.getItem('edit-id');
var asset = [];
var mode = '';


modeswitch.addEventListener('click',()=>{
    span.classList.toggle("switch-off");
    if(span.className == 'switch-on switch-off'){
        // alert(span.className);
      mode = 'off'
    }else{
      // alert(span.className);
      mode = 'on'
    }
    alert(mode);
});


async function editdata() {
  // const name = document.querySelector('#edit-name');
  // const photo = document.querySelector('#edit-photo');
  // const detail = document.querySelector('#edit-detail');

}

async function getdata() {
  const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
  }
  try {
      const response = await fetch(`/admin/edit/${asset_id}`,options);
      if (response.ok) {
          asset = await response.json();
          if (asset) {
            showData();
          } else {
              location.replace('/admin/list')            
          }
        }
        else {
          throw Error('Connection error');``
        }
      } catch (error) {
        console.error(error.message);
        alert(error.message);
      }
    }
    
    function showData() {
    console.log(asset);;
    var name = document.querySelector('#edit-name');
    var photo = document.querySelector('#edit-photo');
    var detail = document.querySelector('#edit-detail');
  
    name.innerHTML = asset[0].asset_name;
    name.onclick = async function () {
      const { value: name } = await Swal.fire({
        input: "text",
        background:"#454545",
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
        hideClass:{
          popup: `
          animate__animated
          animate__fadeOutUp
          animate__faster
          `
        },
        showCancelButton: true
      });
      if (name) {
        Swal.fire(name);
      }
    }

    photo.src = `/public/img/${asset[0].image}`; 
    photo.onclick = async function () {
      const { value: file } = await Swal.fire({
        title: "Select image",
        input: "file",
        background:"#454545",
        confirmButtonColor: "#D65A0F",
        confirmButtonText: "OK!",
        color:"#FFE6C7",

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
        hideClass:{
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
          Swal.fire({
            title: "Your uploaded picture",
            imageUrl: e.target.result,
            imageAlt: "The uploaded picture"
          });
        };
        reader.readAsDataURL(file);
      }
    }

    detail.innerHTML = asset[0].detail;
    detail.onclick = async function () {
      const { value: text } = await Swal.fire({
        input: "textarea",
        inputLabel: "Detail",
        inputPlaceholder: "Type your detail here...",
        inputAttributes: {
          "aria-label": "Type your detail here"
        },
        background:"#454545",
        confirmButtonColor: "#D65A0F",
        confirmButtonText: "OK!",
        color:"#FFE6C7",
        showCancelButton: true,
        showClass: {
          // ? amimation from package animate.css 
          popup: `
          animate__animated
          animate__fadeInDown
          animate__faster
          `
        },
        hideClass:{
          popup: `
          animate__animated
          animate__fadeOutUp
          animate__faster
          `
        },
      });
      if (text) {
        Swal.fire(text);
      }
    }

    console.log(asset[0].asset_status);
    if(asset[0].asset_status == 0){
      span.classList.toggle("switch-off");
      mode = 'off'
    }else{
      // span.classList.toggle("switch-on");
      mode = 'on'
    }
}

document.querySelector('#delete-button').onclick = function () {
  Swal.fire({
      title: 'ARE YOU SURE?',
      color:'#D65A0F',
      icon: 'warning',
      background: '#FFE6C7',
      showCancelButton: true,
      confirmButtonColor: '#D65A0F',
      cancelButtonColor: '#454545',
      confirmButtonText: 'Yes'
      ,cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.replace('/views/admin/assetlist.html');
      }
    });
  // console.log('Test');
}
document.querySelector('#confirm').onclick = function () {
  Swal.fire({
      title: 'ARE YOU SURE?',
      color:'#D65A0F',
      icon: 'warning',
      background: '#FFE6C7',
      showCancelButton: true,
      confirmButtonColor: '#D65A0F',
      cancelButtonColor: '#454545',
      confirmButtonText: 'Yes'
      ,cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.replace('/admin/list');
      }
    });
  // console.log('Test');
}

getdata();