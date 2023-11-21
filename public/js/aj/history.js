
getHisInfo();

// all asset
async function getHisInfo() {
    // use when error or success
    const His = document.querySelector('#his-info');
    // console.log('allList Element:', His);

    try {
        const result = await fetch('/borrow');
        // console.log('Server Response:', result);

        if (result.ok) {
            const data = await result.json();
            let content = '';
            if (data.length > 0) {
                data.forEach(history => {
                    const formatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
                    let lastReturnDate = '';
                    if(history.update_status){
                        lastReturnDate = new Date(history.update_status).toLocaleString(undefined, formatOptions);
                    }else{
                        lastReturnDate = 'Not yet return'
                    }
                    const borrowDate = new Date(history.borrow_date).toLocaleString(undefined, formatOptions);
                    const returnDate = new Date(history.return_date).toLocaleString(undefined, formatOptions);
                    const color = colorStatus(history.status);
                    const status = textStatus(history.status);
                    // display only (late but returned, reject, returned) [all asset returned history.update_status != null]
                    if (history.status != 1 || history.update_status != null) {
                        content += `
                        <div class="d-flex justify-content-center">
                            <div class="col-12 border border-3 border-dark rounded-4 m-3 p-2 bg-white shadow">
                                <div class="col mx-3">
                                    <h4 class="d-flex justify-content-between"><span>User:${history.userName} <span class="text-black-50">borrow ${history.asset_name}</span></span><span ${color}>${status}</span></h4>
                                    <h5 class="d-flex justify-content-between" ${color}>borrow date: ${borrowDate}<span>Update when: ${lastReturnDate}</span></h5>`
                        // if reject
                        if (history.status == 3 || history.status == 2 || (history.status == 5 && history.update_status == null)) {
                            content += `<h5 class="d-flex justify-content-between" ${color}><span>Return date: ${returnDate}</span><span>By: AJ.${history.adminName}</h5>`;
                        }
                        // if not reject
                        else {
                            content += `<h5 class="d-flex justify-content-between"${color}><span>Return date: ${returnDate}</span><span>${history.userName} return when: ${lastReturnDate}<span></h5>
                            <h5 class="d-flex justify-content-end"${color}><span><span>Accept by: Admin.${history.adminName}<span></h5>`;
                        }
                        // have message or not
                        if (history.message != null && history.message != '') {
                            content += `<h5>Message: ${history.message}</h5>`
                        } else {
                            content += `<h5>Message: - </h5>`
                        }
                        content += `</div></div></div>`
                    }
                });
            } else {
                content = `<hr><h1 class="text-center">Has no borrow assets</h1>`;
            }
            // if borrow has data but has only status 1
            if (content == '') {
                content = `<hr><h1 class="text-center">Has no History assets</h1>`;
            }
            His.innerHTML = content;
        }
        else {
            const data = await result.text();
            His.innerHTML = data;
        }
    } catch (err) {
        console.error(err);
    }
}


function colorStatus(statusCode) {
    switch (statusCode) {
        case 1:
            return 'style="display:none"';
        case 2:
            return 'style="color: green;"';
        case 3:
            return 'style="color: red;"';
        case 4:
            return 'style="color: green;"';
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
            return 'Approve (returned)';
        case 5:
            return 'Approve (late)';
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