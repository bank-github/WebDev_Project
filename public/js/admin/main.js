const body = document.querySelector('body');
 sidebar = body.querySelector('.sidebar');
 toggle = body.querySelector('#sidebarToggle');
 

toggle.onclick = function () {
 sidebar.classList.toggle("close");   
}

sidebar.querySelector('#logout').onclick = function () {
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
          window.location.replace('/logout');
        }
      });
    console.log('Test');
}