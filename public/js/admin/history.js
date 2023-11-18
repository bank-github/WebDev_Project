var data = [];

async function getBorrow() {
    const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    }
    try {
        const response = await fetch('/borrows',options);
        if (response.ok) {
            data = await response.json();                           
            console.log(data);
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
    for (const iterator of data) {
        dataTable += `<tr>`;
        dataTable += `<td>${iterator.asset_id}</td>`;
        dataTable += `
        <td>
        <div class="imagetable-container">
        <image class=imagetable d-flex align-items-center justify-content-center src='/public/img/${iterator.image}'>
        </image>
        </div>
        </td>`;
        dataTable += `<td>${iterator.asset_name}</td>`;
        if(iterator.asset_status == 1){
            if (iterator.status == 0) {
                dataTable += `<td><div class="circle-container"><div class="bg-success circle">
                </div></div></td>`;
            } else if (iterator.status == 1 ) {
                console.log(iterator.asset_name +'status = 1');
                dataTable += `<td><div class="circle-container"><div class="bg-warning circle">
                </div></div></td>`;
            } else {
                console.log(iterator.asset_name +'status = 0');
                dataTable += `<td><div class="circle-container"><div class="bg-danger circle">
                </div></div></td>`;
            }
        }else {
                if(iterator.asset_status == 0){
                    console.log(iterator.asset_name+'status = 0');
                    dataTable += `<td><div class="circle-container"><div class="bg-dark circle">
                    </div></div></td>`;
                }
                else {
                dataTable += `<td><div class="circle-container"><div class="bg-success circle">
                </div></div></td>`;            
                }
        }
        const date = new Date(iterator.borrow_date);
        dataTable += `<td>${date.getDay()}/${date.getMonth()}/${date.getFullYear()}</td>`;
    }
    table.innerHTML = dataTable;
}

getBorrow()