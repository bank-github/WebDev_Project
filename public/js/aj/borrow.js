
const borrow_id = sessionStorage.getItem('borrow_id');
// sessionStorage.removeItem('borrow_id');
// alert(borrow_id);

async function getdata(borrow_id) {
    try {
        const response = await fetch(`/aj/borrow-getdata-approve/${borrow_id}`);
        if (response.ok) {
            const data = await response.json();
            // console.log(data[0]);
            // ? data form resonse have 1 object
            showdata(data[0]);
        } else {
            throw Error('Connection error');
        }
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
}

function showdata(data) {   
    const asset_name = document.querySelector('#assetname');
    const username = document.querySelector('#username');
    const deadline = document.querySelector('#deadline');
    const detail = document.querySelector('#detail');
    var img = document.querySelector('#img-asset');

    const return_date = new Date(data.return_date);
    asset_name.innerHTML = data.asset_name;
    username.innerHTML = 'Username : '+data.name;
    deadline.innerHTML = `Return deadline : ${return_date.getDate()}/${return_date.getMonth()}/${return_date.getFullYear()}`;
    detail.innerHTML = 'Detail : '+data.detail;
    img.src = `/public/img/${data.image}`; 
}

getdata(borrow_id);