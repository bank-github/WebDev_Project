
// register submit
const formInput = document.querySelector('#formInput');
formInput.onsubmit = async function (e) {
    // not refresh from
    e.preventDefault();
    // set data
    const data = {
        "name": formInput.elements['txtname'].value,
        "email": formInput.elements['txtemail'].value,
        "password": formInput.elements['txtpassword'].value,
        "conpass": formInput.elements['txtconfirmpass'].value,
        "major": formInput.elements['Major'].value,
        "year": formInput.elements['year'].value,
        "phoneNum": formInput.elements['txtphone'].value,
        "stu_id": formInput.elements['txtstuID'].value
    }
    // set method
    const options = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }
    // add data
    try {
        const response = await fetch('/user/register', options);
        if (response.ok) {
            const data = await response.text();
            formInput.reset();
            window.location.replace(data);
            alert('OK');
        } else if(response.status == 401){
            const data = await response.text();
            throw Error(data);
        }
        else {
            const data = await response.text();
            throw Error(data);
        }
    } catch (err) {
        console.error(err.message);
        alert(err.message);
    }
}

// click cancel button
function goBack(){
    window.location.replace('/');
}