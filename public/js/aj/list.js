
let listborrow = document.querySelector('.listborrow');

async function getdata() {
    const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    }
    try {
        const response = await fetch('/borrows',options);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            for (const iterator of data) {
                if(iterator.status == 1 && iterator.asset_status != 0){
                    listborrow.appendChild(createlist(iterator));
                }
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

function removelist(list) {
    listborrow.removeChild(list);
}

function createlist(data) {
        // ! craete list div 
        const list = document.createElement('div');
        // ! add class
        list.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mt-5');
        list.id = data.borrow_id;

        // ! create circle-listasset
        const circle_listasset = document.createElement('div');
        circle_listasset.classList.add('circle-listasset');
        circle_listasset.innerHTML = `<h4>${data.asset_name}</h4>`;
    
        // !create time
        const time = document.createElement('div');
        circle_listasset.classList.add('time');
        const date = new Date(data.borrow_date);
        // console.log(isDate(date));
        time.innerHTML = `<h5>${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</h5>`
    
        // !create button
        const button = document.createElement('button');
        button.classList.add(`btn`);
        button.type = 'button';
        button.innerText = 'Click Approve'
        button.onclick =  function () {
            // alert(data.borrow_id);
            // sessionStorage.setItem('borrow_id',data.borrow_id);
            // location.href = '/aj/borrow';\
            Swal.fire({
                title: `${data.asset_name}`,
                text: `Do you want to approve ${data.asset_name} ?`,
                icon: "warning",
                imageUrl: `/public/img/${data.image}`,
                imageHeight: 150,
                imageWidth: 200,
                imageAlt: `image of ${data.asset_name}`,
                showCancelButton: true,
                showDenyButton:true,
                confirmButtonColor: "#D65A0F",
                cancelButtonColor: "#454545",
                confirmButtonText: "Approve it!",
                denyButtonText: `Reject`,
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
                  }
              }).then(async (result) => {
                if (result.isConfirmed) {
                    // ! change status in borrow to 2 (approve)
                    // ! add message = 'Approve' to borrow (approve)
                    updateStatusandMessage(2,data.borrow_id,'Approve');    
                        // ! popup
                        Swal.fire({
                        title: "Approve!",
                        text: `${data.asset_name} has been approved.`,
                        icon: "success",
                        showCancelButton:false,
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
                          hideClass: {
                            popup: `
                            animate__animated
                            animate__fadeOutUp
                            animate__faster
                            `
                          }                    
                      }) ;
                      removelist(list);                            
                  
                }else if(result.isDenied){
                    // ! pop up
                    const {value: message} = await Swal.fire({
                        title: "Reject!",
                        text: `${data.asset_name} has been rejected.`,
                        icon: "error",
                        // ! message for reject
                        input:"text",
                        inputLabel:"Input your argument",
                        inputValidator: (value) => {
                            if (!value) {
                              return "You need to write argument!";
                            }                          },
                        showCancelButton:true,
                        confirmButtonColor: "#D65A0F",
                        confirmButtonText: "OK!",
                        cancelButtonColor: "#454545",
                        showClass: {
                            // ? amimation from package animate.css 
                            popup: `
                            animate__animated
                            animate__fadeInDown
                            animate__faster
                            `
                          },
                          hideClass: {
                            popup: `
                            animate__animated
                            animate__fadeOutUp
                            animate__faster
                            `
                          }
                        });
                        if (message) {
                            // alert(message);
                            // ! change status in borrow to 3 (reject)
                            // ! add message to borrow (reject)
                            updateStatus(3,data.borrow_id,message);
                            // ! remove list 
                            removelist(list);
                        }
                        
                }
              });
            }

        list.appendChild(circle_listasset);
        list.appendChild(time);
        list.appendChild(button);
    return list;
}



function isDate(myDate) {
    return myDate.constructor === Date;
}

async function updateStatusandMessage(status,borrow_id,message) {
    const url = `/borrows/${borrow_id}`;
    // let data = '';
    const options = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( { 
            "status": status,
            "message": message
        })
    };
    try {
        const response = await fetch(url,options);
        if (response.ok) {
            const data =  await response.text();
        }else{
            throw Error('Connection error');
        }
        
    } catch (error) {
        console.error(error.message);
        alert(error.message)
    }
}

getdata();
