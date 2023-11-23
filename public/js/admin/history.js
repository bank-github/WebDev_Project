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
            borrow.sort(function(a, b) {
                const dateA = new Date(a.update_status);
                const dateB = new Date(b.update_status);
              
                return dateB - dateA;
              });
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
    console.log(borrow);
    var table = document.querySelector('tbody');
    var dataTable = '';
    for (const iterator of borrow) {
        if (iterator.status > 2 && iterator.status < 6  && iterator.update_status != null ) {
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
            if (iterator.status == 4 || iterator.status == 5) {
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

function search() {
    const search = document.querySelector('.searchinput');
    
    const filter = search.value.toLowerCase();
    console.log(filter);
    const table = document.querySelector('table');
    var rows = table.querySelectorAll('tbody tr'); // Select rows only from tbody
    var textValue;

    rows.forEach(function(row) {
        var cells = row.getElementsByTagName('td');
        console.log(cells);
        var matchFound = false;

        for (var j = 0; j < cells.length; j++) {
            textValue = cells[j].textContent || cells[j].innerText;
            if (textValue.toLowerCase().indexOf(filter) > -1) {
                matchFound = true;
                break; // Break out of the loop if a match is found in any cell
            }
        }

        if (matchFound) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}


getBorrow();