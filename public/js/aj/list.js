

async function getdata() {
    const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    }
    try {
        const response = await fetch('/aj/list-getdata',options);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            for (const iterator of data) {
                document.querySelector('.listborrow').appendChild(createlist(iterator));
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

function createlist(data) {
    // ! craete list div 
        const list = document.createElement('div');
        // ! add class
        list.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mt-5');
    
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
        button.onclick = function () {
            // alert(data.borrow_id);
            sessionStorage.setItem('borrow_id',data.borrow_id);
            location.href = '/aj/borrow';
        }

        list.appendChild(circle_listasset);
        list.appendChild(time);
        list.appendChild(button);
    return list;
}


function isDate(myDate) {
    return myDate.constructor === Date;
}



getdata();
