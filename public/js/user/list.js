
getList();

// all asset
async function getList() {
  // use when error or success
  const allList = document.querySelector('#all-list');
  // console.log('allList Element:', allList);

  try {
    const result = await fetch('/borrows');
    // console.log('Server Response:', result);

    if (result.ok) {
      const data = await result.json();
      let content = '';
      if (data.length > 0) {
        data.forEach(borrow => {
          const formatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
          const borrowDate = new Date(borrow.borrow_date).toLocaleString(undefined, formatOptions);
          const returnDate = new Date(borrow.return_date).toLocaleString(undefined, formatOptions);
          const color = colorStatus(borrow.status);
          const status = textStatus(borrow.status);
          if (borrow.status == 1 || borrow.status == 2 || borrow.update_status == null) {
            content += `
          <div class="d-flex">
            <div class="col-9 border border-3 border-dark rounded-pill m-3 p-2 bg-white shadow">
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
          </div>`;
          }
        });
      }
      else {
        content = `<hr><h1 class="text-center">Has no borrow assets</h1>`;
      }
      // if borrow has data but has no status 1
      if (content == '') {
        content = `<hr><h1 class="text-center">Has no pending assets</h1>`;
      }
      allList.innerHTML = content;
    } else {
      const data = await result.text();
      allList.innerHTML = data;
    }
  } catch (err) {
    console.error(err);
  }
}


function colorStatus(statusCode) {
  switch (statusCode) {
    case 1:
        return '';
    case 2:
        return 'style="color: green;"';
    case 3:
        return 'style="display:none"';
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