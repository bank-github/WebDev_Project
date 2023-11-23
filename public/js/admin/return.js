
let listborrow = document.querySelector('#borrow');
let modalBody = document.querySelector('#body');
const myModal = new bootstrap.Modal(document.getElementById('modalId'));
const formUpdate = document.querySelector('#update');
async function getdata() {
    try {
        const response = await fetch('/borrows');
        if (response.ok) {
            const data = await response.json();
            const returnAsset = data.filter((dt) => data.update_status == null);
            let content = '';
            // console.log(data);
            if (returnAsset.length > 0) {
                for (const list of returnAsset) {
                    const formatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
                    const borrowDate = new Date(list.borrow_date).toLocaleString(undefined, formatOptions);
                    const returnDate = new Date(list.return_date).toLocaleString(undefined, formatOptions);
                    const color = colorStatus(list.status);
                    const late = checkLate(list.return_date);
                    const id = list.borrow_id;
                    if (late == "Late" && list.status == 2) {
                        updateStatusandMessage(5, id, 2);
                        getdata();
                    }
                    const status = textStatus(list.status);
                    const returnAsset = {
                        "id": id,
                        "status": status
                    }
                    // if(status != )
                    // list.status == 1 || list.status == 2 || list.update_status == null
                    if (list.status == 2 || (list.status == 5 && list.update_status == null)) {
                        content += `
                        <div class="d-flex justify-content-between align-items-center mt-5">
                            <div class="circle-listasset col-6">
                            <h4>User ID: ${list.user_id} Name: ${list.userName}</h4>
                            <h4 class="text-black-50">Borrow: ${list.asset_name}</h4>
                            </div>
                            <div class="time col-4">
                                <h5 class="text-success">Borrow date: <span>${borrowDate}</span></h5>
                                <h5 class="text-danger">Return date: <span>${returnDate}</span></h5>
                            </div>`
                        // if (list.status == 2) {
                        //     content += `<button type="button" class="btn col-2" onclick="openModal(${id})">${status}</button>`
                        // }
                        //  else {
                        content += `<button type="button" class="btn col-2" onclick=returnAsset(${JSON.stringify(returnAsset)}) ${color}>${status}</button>`
                        // }
                        content += `</div><hr>`;
                    }
                }
            } else {
                content = `<hr><h1 class="text-center">Has no borrow assets</h1>`;
            }
            if (content == '') {
                content = `<hr><h1 class="text-center">Has no pending assets</h1>`;
            }
            listborrow.innerHTML = content;
        }
        else {
            throw Error('Connection error');
        }
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
}
function colorStatus(statusCode) {
    switch (statusCode) {
        case 1:
            return 'style="display:none"';
        case 2:
            return 'style="background-color: green;"';
        case 3:
            return 'style="display:none"';
        case 4:
            return 'style="display:none"';
        case 5:
            return 'style="background-color: orange;"';
        default:
            return 'style="display:none"';
    }
}

function textStatus(statusCode) {
    switch (statusCode) {
        case 1:
            return 'Pending';
        case 2:
            return 'Return';
        case 3:
            return 'Reject';
        case 4:
            return 'Returned';
        case 5:
            return 'Return(Late)';
        default:
            return 'unknow';
    }
}

function checkLate(returnDate) {
    const rtDate = new Date(returnDate).getDate()
    const nDate = new Date().getDate()
    if (nDate > rtDate) {
        return "Late"
    } else {
        return ''
    }
}

function openModal(id) {
    myModal.show();

    formUpdate.onsubmit = function (e) {
        const message = formUpdate.elements['message'].value;
        const status = formUpdate.elements['status'].value;
        let assteStatus = 2;
        let date;
        if (status == 3) {
            date = new Date();
            assteStatus = 1
        }
        console.log(date);
        // console.log(status)
        // console.log(message);
        e.preventDefault();
        if (updateStatusandMessage(status, id, assteStatus, date, message) == 'err') {
            alert("error")
        } else {
            getdata();
            Swal.fire('Update succesfully', '', 'success');
        }
        // console.log(id)
        formUpdate.reset();
        myModal.hide();
    }
}

function returnAsset(data) {
    const nowDate = new Date()
    console.log(nowDate);
    let color = "#0BDA51";
    let text = 'Returned';
    let status = 4;
    if (data.status == 'Return(Late)') {
        color = "#FFC300";
        text = 'Returned late';
        status = 5;
    }
    // console.log(data)
    // alert(id);
    Swal.fire({
        title: 'Do you want to save the changes?',
        showCancelButton: true,
        confirmButtonText: text,
        confirmButtonColor: color,
    }).then((result) => {
        if (result.isConfirmed) {
            if (updateStatusandMessage(status, data.id, 1, nowDate) == 'err') {
                alert(error.message)
            } else {
                getdata();
                Swal.fire('Update succesfully', '', 'success');
            }

        }
    })

}

//==============================================================================

// function removelist(list) {
//     listborrow.removeChild(list);
// }

// function createlist(data) {
//         // ! craete list div 
//         const list = document.createElement('div');
//         // ! add class
//         list.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mt-5');
//         list.id = data.borrow_id;

//         // ! create circle-listasset
//         const circle_listasset = document.createElement('div');
//         circle_listasset.classList.add('circle-listasset');
//         circle_listasset.innerHTML = `<h4>${data.asset_name}</h4>`;

//         // !create time
//         const time = document.createElement('div');
//         circle_listasset.classList.add('time');
//         const date = new Date(data.borrow_date);
//         // console.log(isDate(date));
//         time.innerHTML = `<h5>${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</h5>`

//         // !create button
//         const button = document.createElement('button');
//         button.classList.add(`btn`);
//         button.type = 'button';
//         button.innerText = 'Click Approve'
//         button.onclick =  function () {
//             // alert(data.borrow_id);
//             // sessionStorage.setItem('borrow_id',data.borrow_id);
//             // location.href = '/aj/borrow';\
//             Swal.fire({
//                 title: `${data.asset_name}`,
//                 text: `Do you want to approve ${data.asset_name} ?`,
//                 icon: "warning",
//                 imageUrl: `/public/img/${data.image}`,
//                 imageHeight: 150,
//                 imageWidth: 200,
//                 imageAlt: `image of ${data.asset_name}`,
//                 showCancelButton: true,
//                 showDenyButton:true,
//                 confirmButtonColor: "#D65A0F",
//                 cancelButtonColor: "#454545",
//                 confirmButtonText: "Approve it!",
//                 denyButtonText: `Reject`,
//                 showClass: {
//                     // ? amimation from package animate.css 
//                     popup: `
//                     animate__animated
//                     animate__fadeInDown
//                     animate__faster
//                     `
//                   },
//                   hideClass:{
//                     popup: `
//                     animate__animated
//                     animate__fadeOutUp
//                     animate__faster
//                     `
//                   }
//               }).then(async (result) => {
//                 if (result.isConfirmed) {
//                     // ! change status in borrow to 2 (approve)
//                     // ! add message = 'Approve' to borrow (approve)
//                     updateStatusandMessage(2,data.borrow_id,'Approve');    
//                         // ! popup
//                         Swal.fire({
//                         title: "Approve!",
//                         text: `${data.asset_name} has been approved.`,
//                         icon: "success",
//                         showCancelButton:false,
//                         confirmButtonColor: "#D65A0F",
//                         confirmButtonText: "OK!",
//                         showClass: {
//                             // ? amimation from package animate.css 
//                             popup: `
//                             animate__animated
//                             animate__fadeInDown
//                             animate__faster
//                             `
//                           },
//                           hideClass: {
//                             popup: `
//                             animate__animated
//                             animate__fadeOutUp
//                             animate__faster
//                             `
//                           }                    
//                       }) ;
//                       removelist(list);                            

//                 }else if(result.isDenied){
//                     // ! pop up
//                     const {value: message} = await Swal.fire({
//                         title: "Reject!",
//                         text: `${data.asset_name} has been rejected.`,
//                         icon: "error",
//                         // ! message for reject
//                         input:"text",
//                         inputLabel:"Input your argument",
//                         inputValidator: (value) => {
//                             if (!value) {
//                               return "You need to write argument!";
//                             }                          },
//                         showCancelButton:true,
//                         confirmButtonColor: "#D65A0F",
//                         confirmButtonText: "OK!",
//                         cancelButtonColor: "#454545",
//                         showClass: {
//                             // ? amimation from package animate.css 
//                             popup: `
//                             animate__animated
//                             animate__fadeInDown
//                             animate__faster
//                             `
//                           },
//                           hideClass: {
//                             popup: `
//                             animate__animated
//                             animate__fadeOutUp
//                             animate__faster
//                             `
//                           }
//                         });
//                         if (message) {
//                             // alert(message);
//                             // ! change status in borrow to 3 (reject)
//                             // ! add message to borrow (reject)
//                             updateStatus(3,data.borrow_id,message);
//                             // ! remove list 
//                             removelist(list);
//                         }

//                 }
//               });
//             }

//         list.appendChild(circle_listasset);
//         list.appendChild(time);
//         list.appendChild(button);
//     return list;
// }



// function isDate(myDate) {
//     return myDate.constructor === Date;
// }

async function updateStatusandMessage(status, borrow_id, asset, update_status, message) {
    const url = `/borrows/${borrow_id}`;
    // let data = '';
    const options = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "status": status,
            "message": message,
            "update_status": update_status,
            "asset": asset
        })
    };
    try {
        const response = await fetch(url, options);
        if (response.ok) {
            return;
        } else {
            throw Error('Connection error');
        }

    } catch (error) {
        console.error(error.message);
        return 'err';

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

getdata();
