const modeswitch = document.querySelector('.toggle-switch');
const span = document.querySelector('#switch');
modeswitch.addEventListener('click',()=>{
    span.classList.toggle("switch-off-edit");
});

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
          window.location.replace('/views/admin/assetlist.html');
        }
      });
    // console.log('Test');
}