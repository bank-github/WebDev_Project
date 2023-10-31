const data = [
    { 'id': '62134xxx', 'photo': '', 'name': 'XXXX', 'status': 'avalible', 'enable': true },
    { 'id': '62133xxx', 'photo': '', 'name': 'XXXX2', 'status': 'inprogress', 'enable': true },
    { 'id': '62133xxx', 'photo': '', 'name': 'XXXX3', 'status': 'borrowed', 'enable': true },
    { 'id': '62133xxx', 'photo': '', 'name': 'XXXX4', 'status': 'disable', 'enable': false },
]

function showTable() {
    var table = document.querySelector('tbody');
    var i = 0;
    var dataTable = '';
    for (const iterator of data) {
        i += 1;
        dataTable += `<tr data-href='/views/admin/edit.html'><td>${i}</td>`;
        dataTable += `<td>${iterator.id}</td>`;
        dataTable += `
        <td>
            <div class="imagetable-container">
                <div class="imagetable d-flex align-items-center justify-content-center">
                    image
                    ${iterator.photo}
                </div>
            </div>
        </td>`;
        dataTable += `<td>${iterator.name}</td>`;
        if (iterator.status == 'avalible') {
            dataTable += `<td><div class="circle-container"><div class="bg-success circle">
            </div></div></td>`;
        } else if (iterator.status == 'inprogress') {
            dataTable += `<td><div class="circle-container"><div class="bg-warning circle">
            </div></div></td>`;
        } else if (iterator.status == 'borrowed') {
            dataTable += `<td><div class="circle-container"><div class="bg-danger circle">
            </div></div></td>`;
        } else {
            dataTable += `<td><div class="circle-container"><div class="bg-dark circle">
            </div></div></td>`;
        }
        if(iterator.enable){
            dataTable += `
            <td>
                <div class="toggle-switch-container">
                    <div class="toggle-switch">
                        <span class="switch-on"></span>
                    </div>        
                </div>
            </td></tr>`
            ;
        }else{
            dataTable += `
            <td>
                <div class="toggle-switch-container">
                    <div class="toggle-switch">
                        <span class="switch-off"></span>
                    </div>        
                </div>
            </td></tr>`
            ;
        }
    }
    table.innerHTML = dataTable;
}
var mode = document.querySelector('.toggle-switch');

document.addEventListener("DOMContentLoaded", function () {
    const tableRows = document.querySelectorAll("tbody tr[data-href]");
    tableRows.forEach((row) => {
        row.addEventListener("click", function () {
            window.location.href = this.getAttribute("data-href");
        });
    });
});

showTable();