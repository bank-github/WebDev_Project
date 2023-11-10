
getList();

// all asset
async function getList() {
    // use when error or success
    const msg = document.querySelector('#message-borrow');
    const st = document.querySelector('#message-status');
  
    try {
      const result = await fetch('/user/message-borrow');
      // console.log('Server Response:', result);
      if (result.ok) {
        const data = await result.json();
        let content = '';
        let contentS = '';
        
        if (data.length > 0) {
          const msn = data[0]; 
          const msn_nd = data[1]; 
          const msn_rd = data[2]; 
          const msn_th = data[3]; 
          content = `
            <h2 class="msg-h" >INBOX</h2>
            <h3 class="msg-2h">user id ${msn_nd.user_id} Borrowing the ${AssetName(msn_nd.asset_id)}.</h3>
            <h3 class="msg-3h">user id ${msn_rd.user_id} Your asset id ${AssetName(msn_rd.asset_id)}</h3>
            <h3 class="msg-4h">user id ${msn_th.user_id} Your asset id ${AssetName(msn_th.asset_id)}</h3>
            <h3 class="msg-5h">user id ${msn.user_id} Your asset id ${AssetName(msn.asset_id)}</h3>
          </div>`;
  
          contentS = `         
            <button class="bx bx-check-double icon" id="green-chInbox" onclick="Approved()">${msn_nd.message}</button>
            <button class="bx bx-error-alt icon" id="warning-chInbox" onclick="late()" role="button">${msn_rd.message}</button>
            <button class="bx bx-alarm-exclamation icon" id="aware-chInbox" onclick="WarnDeadLine()">${msn_th.message}</button>
            <button  class="bx bx-calendar-x icon" id="problems-chInbox" onclick="Avaliable()">${msn.message}</button>
          `;
        }
  
        msg.innerHTML = content;
        st.innerHTML = contentS;
      } else {
        const data = await result.text();
        msg.innerHTML = data; // Clear the message element
        st.innerHTML = data; // Display the status data
      }
    } catch (err) {
      console.error(err);
    }
  }
//   function Status(statusCode) {
//     switch (statusCode) {
//         case 0:
//             return `class="bx bx-check-double icon" id="green-chInbox" onclick="Approved()"`;
//         case 1:
//             return `class="bx bx-error-alt icon" id="warning-chInbox" onclick="late()" role="button"`;
//         case 2:
//             return `class="bx bx-alarm-exclamation icon" id="aware-chInbox" onclick="WarnDeadLine()"`;
//         case 3:
//             return `class="bx bx-calendar-x icon" id="problems-chInbox" onclick="Avaliable()"`;
//         case 4:
//             return late();
//         default:
//             return 'Unknown Status';
//     }
// }
//   function Status(Code) {
    
//     switch (Code) {
//         case '0':
//           return Avaliable();          
//         case '1':
//           return Pending();      
//         case '2':
//           return Approved() ;            
//         case '3':
//           return Reject();            
//         case '4':
//           return late();    
//         default:
//             break;
//     }
// }
// function handleStatus(code) {
//   const result = Status(code);
//   // Handle the result as needed
//   switch (result) {
//       case 'Avaliable':
//         Avaliable()
//           break;
//       case 'Pending':
//         Pending()
//           break;
//       case 'Approved':
//         Approved()
//           break;
//       case 'Reject':
//         Reject()
//           break;
//       case 'late':
//           late();
//           break;
//       default:
//           break;
//   }
// }
  function AssetName(byId) {
    switch (byId) {
        case 1:
            return 'networkbook';
        case 2:
            return 'air-purifier';
        case 3:
            return 'chair';    
        case 4:
            return 'air-conditioner';           
        case 5:
            return 'fan';
        case 6:
            return 'notebook';    
        case 7:
            return 'printer';
        case 8:
            return 'table';
        case 9:
            return 'monitor';      
        case 10:
            return 'vacuum-cleaner';  
        case 11:
            return 'mouse';
        case 12:
            return 'keyboard';      
        default:
            return 'Unknown Asset';
    }
  }


  function Approved() {
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
  function Avaliable() {
    const emailContent = "Your Assets Returned , Avaliable Again !!"
    
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
    function Reject() {
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
    function WarnDeadLine() {
    const emailContent = "Your 3rd Assets is Close to return !  3 November 2023 So, Please return the asset on 3days. to avoid being punished."
  
        Swal.fire({
          title: 'Close to Return!',
          html: emailContent,
          icon: 'warning',
          confirmButtonText: 'Close',
          showCancelButton: false,
        });
  }
    function late() {
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
    function Returned() {
    const emailContent = "Assets 5th is returned on time."
    
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
    function Pending() {
    const emailContent = "Assets 5th is pending."
    
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