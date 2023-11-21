// for button status
const pending = document.querySelector('#pending');
const approve = document.querySelector('#approve');
const reject = document.querySelector('#reject');
var borrowUser;
// use when error or success
const allList = document.querySelector('#all-list');
const userID = window.localStorage.getItem('userID');

// pending onclick
pending.onclick = function () {
  pending.disabled = true;
  approve.disabled = false;
  reject.disabled = false;
  // default pending shown
  const brPending = borrowUser.filter((br) => br.status == 1);
  listCreate(brPending);
}
// appreve onclick
approve.onclick = function () {
  pending.disabled = false;
  approve.disabled = true;
  reject.disabled = false;
  // default pending shown
  const brApprove = borrowUser.filter((br) => br.status == 2 || (br.status == 5 && br.update_status == null));
  listCreate(brApprove);
}
// pending onclick
reject.onclick = function () {
  pending.disabled = false;
  approve.disabled = false;
  reject.disabled = true;
  // default pending shown
  const brReject = borrowUser.filter((br) => br.status == 3);
  // kept only 5 element
  if (brReject.length > 5) {
    listCreate(brReject.slice(0, 5));
  } else {
    listCreate(brReject);
  }

}

// get all asset
async function getList() {
  // console.log('allList Element:', allList);
  try {
    const result = await fetch('/borrows');
    // console.log('Server Response:', result);
    if (result.ok) {
      const data = await result.json();
      borrowUser = data.filter((dt) => dt.user_id == userID);
      // default pending shown
      const brPending = borrowUser.filter((br) => br.status == 1);
      listCreate(brPending);

    } else {
      const data = await result.text();
      allList.innerHTML = data;
    }
  } catch (err) {
    console.error(err);
  }
}

// function create status list
function listCreate(borrowUser) {
  let content = '';
  if (borrowUser.length > 0) {
    borrowUser.forEach(borrow => {
      const formatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const borrowDate = new Date(borrow.borrow_date).toLocaleString(undefined, formatOptions);
      const returnDate = new Date(borrow.return_date).toLocaleString(undefined, formatOptions);
      const color = colorStatus(borrow.status);
      const status = textStatus(borrow.status);

      // borrow.status != 4 && (borrow.status != 5 || borrow.update_status == null)
      content += `
          <div class="d-flex">
            <div class="col-9 border border-3 border-dark rounded-pill m-3 mb-3 p-2 bg-white shadow">
              <div class="row">
                  <div class="col-4">
                      <h4 class="pt-1 ps-5">Asset: ${borrow.asset_name}</h4>
                  </div>
                  <div class="col-8 text-end">
                      <div class="border border-3 border-dark rounded-pill" style="background-color: #FFE6C7;">
                          <h4 class="text-center">
                              <span class="text-success">Start: ${borrowDate}</span> <i class="bi bi-arrow-right" style="font-size = 5rem"></i> <span class="text-danger">End: ${returnDate}</span>
                          </h4>
                      </div>
                  </div>
              </div>
            </div>
            <div class="col m-3 p-2">
              <h4 class="text-center pt-1"  ${color}>${status}</h4>
            </div>
          </div><hr>`;
    });
  }
  else {
    content = `<hr><h1 class="text-center">Has no assets</h1>`;
  }
  // if borrow has data but has no status 1
  if (content == '') {
    content = `<hr><h1 class="text-center">Has no assets</h1>`;
  }
  allList.innerHTML = content;
}


function colorStatus(statusCode) {
  switch (statusCode) {
    case 1:
      return '';
    case 2:
      return 'style="color: green;"';
    case 3:
      return 'style="color: red;"';
    case 4:
      return 'style="display:none"';
    case 5:
      return 'style="color: orange;"';
    default:
      return 'style="display:none"';
  }
}

function textStatus(statusCode) {
  switch (statusCode) {
    case 1:
      return 'Pending';
    case 2:
      return 'Approve';
    case 3:
      return 'Reject';
    case 4:
      return 'Returned';
    case 5:
      return 'Late';
    default:
      return 'unknow';
  }
}

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