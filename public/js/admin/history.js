var borrow = [];


async function getBorrow() {
    const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    }
    try {
        const response = await fetch('/borrows',options);
        if (response.ok) {
            borrow = await response.json();                           
            console.log(borrow);
            showTable();
        }
        else {
            throw Error('Connection error');
        }
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
  
  }

  function showTable() {
    var table = document.querySelector('tbody');
    var dataTable = '';
    for (const iterator of borrow) {
        if (iterator.status > 2 && iterator.status < 6 ) {
            dataTable += `<tr>`;
            dataTable += `<td>${iterator.user_id}</td>`;
            dataTable += `<td>${iterator.userName}</td>`;
            dataTable += `<td>${iterator.asset_id}</td>`;
            dataTable += `
            <td>
            <div class="imagetable-container">
            <image class=imagetable d-flex align-items-center justify-content-center src='/public/img/${iterator.image}'>
            </image>
            </div>
            </td>`;
            dataTable += `<td>${iterator.asset_name}</td>`;
                if (iterator.status == 4) {
                    dataTable += `<td><div class="circle-container"><div class="bg-success circle">
                    </div></div></td>`;
                } else if (iterator.status == 5) {
                    // console.log(iterator.asset_name +'status = 1');
                    dataTable += `<td><div class="circle-container"><div class="bg-warning circle">
                    </div></div></td>`;
                } else {
                    // console.log(iterator.asset_name +'status = 0');
                    dataTable += `<td><div class="circle-container"><div class="bg-danger circle">
                    </div></div></td>`;
                }

                const borrow_date = new Date(iterator.borrow_date);
                dataTable += `<td>${borrow_date.getDate()}/${borrow_date.getMonth()+1}/${borrow_date.getFullYear()}</td>`;
                const update_status_date = new Date(iterator.update_status);
            if (iterator.status == 4 || iterator.status == 5 && iterator.update_status != null) {
                dataTable += `<td>${update_status_date.getDate()}/${update_status_date.getMonth()+1}/${update_status_date.getFullYear()}</td>`;
            }else if(iterator.status == 3){
                dataTable += `<td>Reject when ${update_status_date.getDate()}/${update_status_date.getMonth()+1}/${update_status_date.getFullYear()} </td>`;
            } 
            else {
                dataTable += `<td>late but not returned</td>`
            }    
        }
        
    }
    table.innerHTML = dataTable;
}

getBorrow()