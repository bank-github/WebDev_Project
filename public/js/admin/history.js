const data = [
    { 'id': '62134xxx', 'photo': '', 'name': 'XXXX', 'status': 'avalible', 'enable': true ,'date':'20/10/2023' },
]

function showTable() {
    var table = document.querySelector('tbody');
    var dataTable = '';
    for (const iterator of data) {
        dataTable += `<tr data-href='/views/admin/edit.html'>`;
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
            </td>`
            ;
        }else{
            dataTable += `
            <td>
                <div class="toggle-switch-container">
                    <div class="toggle-switch">
                        <span class="switch-off"></span>
                    </div>        
                </div>
            </td>`
            ;
        }
        dataTable += `<td>${iterator.date}</td></tr>`
    }
    console.log(dataTable);
    table.innerHTML = dataTable;
}
showTable();