function openGmail() {
    // เปิดหน้าต่างเบราว์เซอร์ใหม่พร้อมลิงก์ไปยัง Gmail
    var link = "https://mail.google.com/mail/u/0/#inbox?compose=DmwnWtDpKsfRfdcRVpqTHkQTtgHKNdJlZQCWgnvKfDmxgjWCKbgscXFxkKnNVrpCFfpXPbnZgHtl";
  window.location = link;
  }

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
      window.location.replace('/logout');
    }
  });
  }
