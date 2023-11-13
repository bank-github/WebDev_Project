function openGmail() {
    // เปิดหน้าต่างเบราว์เซอร์ใหม่พร้อมลิงก์ไปยัง Gmail
    var link = "https://mail.google.com/mail/u/0/#inbox?compose=DmwnWtDpKsfRfdcRVpqTHkQTtgHKNdJlZQCWgnvKfDmxgjWCKbgscXFxkKnNVrpCFfpXPbnZgHtl";
  window.location = link;
  }


var userData = [
    { key: "Name", value: "John Judge" },
    { key: "School", value: "IT" },
    { key: "Email", value: "6431501XXX@g.co" },
    { key: "Tel", value: "099-999-999-9" }
  ];

function updateUserInfo() {
  console.log("updateUserInfo() called");
  userData.forEach(function (item) {
    var element = document.getElementById(item.key);
    if (element) {
      element.textContent = item.key + ': ' + item.value;
    }
  });
}

function editProfileInformation() {
  Swal.fire({
    title: 'Edit Profile Information',
    html:
      `<input id="Name" class="swal2-input" placeholder="Name" value=""> 
        <input id="School" class="swal2-input" placeholder="School" value="">
        <input id="Email" class="swal2-input" placeholder="Email" value="">
        <input id="Tel" class="swal2-input" placeholder="Tel" value="">`,
    showCancelButton: true,
    confirmButtonText: 'Save',
  }).then((result) => {
    if (result.isConfirmed) {
      console.log("SweetAlert modal confirmed");
      userData.forEach(function (item) {
        item.value = document.getElementById(item.key).value;
      });

      // Extract updated values from userData
      var newName = userData.find(item => item.key === "Name").value;
      var newSchool = userData.find(item => item.key === "School").value;
      var newEmail = userData.find(item => item.key === "Email").value;
      var newTelephone = userData.find(item => item.key === "Tel").value;
      console.log("Updated values:");
      console.log(newName);
      console.log(newSchool);
      console.log(newEmail);
      console.log(newTelephone);

      // Display updated information
      Swal.fire({
        title: '<h1>Updated Profile Information</h1>',
        html: `
          <h3>Name: ${newName}</h3>
          <h3>School: ${newSchool}</h3>
          <h3>Email: ${newEmail}</h3>
          <h3>Telephone: ${newTelephone}</h3>
        `,
        icon: 'success',
        confirmButtonText: 'OK'
      }); 
    }
  });
}

// Initial update
updateUserInfo();



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
  
// function logout() {
//   Swal.fire({
//     title: 'Do you want to sign out',
//     color:'#FFA559',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#FFA559',
//     cancelButtonColor: '#FFE6C7',
//     cancelButtonText: 'Cancel',
//     confirmButtonText: 'Sure'
    
//   }).then((result) => {
//     if (result.isConfirmed) {
//       const Toast = Swal.mixin({
//         toast: true,
//         position: 'top-end',
//         showConfirmButton: false,
//         timer: 1000,
//         timerProgressBar: true,
//         didOpen: (toast) => {
//           toast.addEventListener('mouseenter', Swal.stopTimer);
//           toast.addEventListener('mouseleave', Swal.resumeTimer);
//         }
//       });
    
//       Toast.fire({
//         icon: 'success',
//         title: 'Signed out successfully'
//       }).then(()=>{
//         window.location.replace('/views/aj/login.html');
//       })
//     }
//   });
    
//   }

  function showReadMailConfirmation() {
  const emailContent = "Your Assets Active now until 12 November 2023   So, Please return the asset on time. to avoid being punished."
  
  Swal.fire({
    title: 'Read Email?',
    text: 'Are you sure you want to read this email?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, read it!',
    cancelButtonText: 'No, cancel',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Approve !!!',
        html: emailContent,
        icon: 'success',
        confirmButtonText: 'Close',
        showCancelButton: false,
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelled', 'You have canceled reading the email', 'error');
    }
  });
}
  function showReadMailNotApproved() {
  const emailContent = "Your Assets is not Approve !   this asset is unavailablenow. I apologize for this problem. When it available, we will notice to you.  Thank you"
  
  Swal.fire({
    title: 'Read Email?',
    text: 'Are you sure you want to read this email?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, read it!',
    cancelButtonText: 'No, cancel',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Not Approve !!!',
        html: emailContent,
        icon: 'info',
        confirmButtonText: 'Close',
        showCancelButton: false,
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelled', 'You have canceled reading the email', 'error');
    }
  });
}
  function showReadMailWarnDeadLine() {
  const emailContent = "Your 3rd Assets is Close to return !  3 November 2023 So, Please return the asset on 3days. to avoid being punished."

      Swal.fire({
        title: 'Close to Return!',
        html: emailContent,
        icon: 'warning',
        confirmButtonText: 'Close',
        showCancelButton: false,
      });
}
  function showReadMailMissingRe() {
  const emailContent = "Assets 5th is not return on time. punished by deducted MFU333 -3 scores & Cannot access to borrow any asset 15 Days. please contact to lecturer to get punished!"
  
  Swal.fire({
    title: 'Read Email?',
    text: 'Are you sure you want to read this email?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, read it!',
    cancelButtonText: 'No, cancel',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'You received punishment!',
        html: emailContent,
        icon: 'error',
        confirmButtonText: 'Close',
        showCancelButton: false,
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelled', 'You have canceled reading the email', 'error');
    }
  });
}
document.addEventListener('DOMContentLoaded', function () {
    var startDate = new Date('2023-10-27');
    var endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 15);
    var formattedEndDate = endDate.toISOString().slice(0, 10);
    document.getElementById('endDate').textContent = formattedEndDate;
});
function displayCurrentDate() {
    const currentDateElement = document.getElementById("currentDate");
    const currentDate = new Date();
    currentDateElement.textContent = currentDate.toDateString();
}


displayCurrentDate();

  function showReturned() {
    var startDate = document.getElementById('startDate').textContent;
    var endDate = document.getElementById('endDate').textContent;

    Swal.fire({
        title: 'Returned',
        html: `
            <h4>Start: ${startDate}</h4>
            <h4>End: ${endDate}</h4>
        `,
        icon: 'info',
        confirmButtonText: 'OK',
    });
}

function showNotReturned() {
    Swal.fire({
        title: 'Not Return',
        text: 'User has not returned the item.',
        icon: 'warning',
        confirmButtonText: 'OK',
    });
}

function showReturnedAgain() {
    var startDate = document.getElementById('startDate').textContent;
    var endDate = document.getElementById('endDate').textContent;

    Swal.fire({
        title: 'Returned',
        html: `
            <h4>Start: ${startDate}</h4>
            <h4>End: ${endDate}</h4>
        `,
        icon: 'info',
        confirmButtonText: 'OK',
    });
}

function showAssetLost() {
    Swal.fire({
        title: 'Asset Lost!',
        text: 'The asset has been marked as lost.',
        icon: 'error',
        confirmButtonText: 'OK',
    });
}
function showHistoryAlert() {
  Swal.fire({
      title: 'History',
      html: `
      <div class="container mt-4 rounded-container dark">
        <div class="row">          
            <div class="info-ht">
                <h3 class="ht2">Assets Example 5 Detail :</h3>
                <h3 class="ht6">Aprroved BY TA.Boat</h3>
                <h3 class="ht7">Will Return 3 Nov 2023</h3>
            </div>               
            <div class="info-ht">
                <h3 class="ht3">Assets Example 6 Detail :</h3>
                <h3 class="ht6">Approved BY AJ.Surapong</h3>
                <h3 class="ht7">Returned , Asset new Avaliable !</h3>
            </div>               
            <div class="info-ht">
                <h3 class="ht4">Assets Example 7 Detail :</h3>
                <h3 class="ht9"> Assets Lost!! Borrower is USER01</h3>
                <h3 class="ht8">Has been punished</h3>
            </div>               
    </div>
        </div>
    </div>
      `,
      showCloseButton: true,
      showConfirmButton: false,
      focusConfirm: false,
      customClass: 'custom-swal',
  });
}

