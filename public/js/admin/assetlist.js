var asset = [];
var borrow = [];

async function getdata() {
    const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    }
    try {
        const response = await fetch('/assets',options);
        if (response.ok) {
            asset = await response.json();
            getBorrow();
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

async function getBorrow() {
    const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    }
    try {
        const response = await fetch('/borrows',options);
        if (response.ok) {
            borrow = await response.json();            
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
    // console.log(asset); 
    var table = document.querySelector('tbody');
    var dataTable = '';
    
    for (const iterator of asset) {
        const borrowstatus = borrow.find('status')
        dataTable += `<tr onclick = sendData(${iterator.asset_id}) >`;
        dataTable += `<td>${iterator.asset_id}</td>`;
        dataTable += `
        <td>
            <div class="imagetable-container">
                <image class=imagetable d-flex align-items-center justify-content-center src='/public/img/${iterator.image}'>
                    </image>
            </div>
        </td>`;
        dataTable += `<td>${iterator.asset_name}</td>`;
        if (iterator.asset_status == 0) {
            dataTable += `<td><div class="circle-container"><div class="bg-dark circle">
            </div></div></td>`;
        } else if (iterator.status == 1 ) {
            dataTable += `<td><div class="circle-container"><div class="bg-warning circle">
            </div></div></td>`;
        } else if (iterator.status == 2) {
            dataTable += `<td><div class="circle-container"><div class="bg-danger circle">
            </div></div></td>`;
        } else {
            dataTable += `<td><div class="circle-container"><div class="bg-success circle">
            </div></div></td>`;
        }
        // ! 0 == disable
        if(iterator.asset_status == 0){
            dataTable += `
            <td>
                <div class="toggle-switch-container">
                    <div class="toggle-switch">
                        <span class="switch-off"></span>
                    </div>        
                </div>
            </td></tr>`
            ;
        }else{
            dataTable += `
            <td>
                <div class="toggle-switch-container">
                    <div class="toggle-switch">
                        <span class="switch-on"></span>
                    </div>        
                </div>
            </td></tr>`
            ;
        }
        i++;
    }
    table.innerHTML = dataTable;
}

function sendData(id) {
    // alert('click');
    sessionStorage.setItem('edit-id',id);
    location.href = '/admin/edit' ;
}

getdata();

var mode = document.querySelector('.toggle-switch');

document.addEventListener("DOMContentLoaded", function () {
    const tableRows = document.querySelectorAll("tbody tr[data-href]");
    tableRows.forEach((row) => {
        row.addEventListener("click", function () {
            window.location.href = this.getAttribute("data-href");
        });
    });
});
