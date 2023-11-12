// when open page get data
getData();

// all asset
async function getData() {
  // use when error or success
  const allAsset = document.querySelector('#all-asset');

  try {
    const result = await fetch('/assets');
    if (result.ok) {
      const data = await result.json();
      let content = '';
      data.forEach(asset => {
        if(asset.status == 1){
          const assetData = JSON.stringify({ "id": asset.asset_id, "name": asset.asset_name });
        content += `<tr class="text-start">
          <td class="text-center"><img src="/public/img/${asset.image}" alt="asset image" height="40px"></td>
          <td id="name${asset.asset_id}"><a href="#" class="text-decoration-none text-dark">${asset.asset_name}</a></td>
          <td><p>
          ${asset.detail}
          </p></td>
          <td class="text-center"><button id="${asset.asset_id}" class="btn btn bg-success text-white" onclick=getDetail(${assetData})>Borrow</button></td>
      </tr>`
        }
        //   data-bs-toggle="modal" data-bs-target="#modalId" ==> for modal
      });
      // console.log(content);
      return allAsset.innerHTML = content;
    } else {
      const data = await result.text();
      return allAsset.innerHTML = data;
    }
  } catch (err) {
    console.error(err);
  }
}

// sign out
// document.querySelector('#signout').onclick = function () {
//   // alert('ok');
//   Swal.fire({
//     title: 'Do you want to sign out',
//     color: '#FFA559',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#FFA559',
//     cancelButtonColor: '#FFE6C7',
//     cancelButtonText: 'Cancel',
//     confirmButtonText: 'Sure'

//   }).then((result) => {
//     if (result.isConfirmed) {
//       window.location.replace('/');
//     }
//   });
// }

// search
function searchAsset() {
  var input = document.querySelector('#txtsearch');
  var filter = input.value.toUpperCase();
  var tbody = document.querySelector('#all-asset');
  var tr = tbody.getElementsByTagName('tr');
  // console.log(tr[0].getElementsByTagName('a')[0].textContent)
  for (var i = 0; i < tr.length; i++) {
    var td = tr[i].getElementsByTagName('a')[0];
    console.log(td)
    var name = td.textContent || td.innerText;
    if (name.toUpperCase().indexOf(filter) > -1) {
      tr[i].style.display = '';
    } else {
      tr[i].style.display = 'none';
    }
  }
}

//show modal 
const myModal = new bootstrap.Modal(document.getElementById('modalId'));
function getDetail(asset) {
  const title = document.querySelector('#modalTitleId');
  // console.log(asset.id);
  localStorage.setItem("asset_id", asset.id);
  title.innerText = `Borrow: ${asset.name}`;
  myModal.show();
}

// form modal on submit
// on submit form
const formBorrow = document.querySelector('#borrow');
formBorrow.onsubmit = async function (e) {
  const brDate = formBorrow.elements['brdate'].value;
  const rtDate = formBorrow.elements['rtdate'].value;
  if (brDate === '' || rtDate === '') {
    e.preventDefault();
    Swal.fire({
      title: 'Please select date',
      color: '#FFA559',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#FFA559',
      confirmButtonText: 'OK',
    })
  } else {
    e.preventDefault();
    myModal.hide();
    // set data
    const data = {
      "brDate": brDate,
      "rtDate": rtDate,
      "asset_id": localStorage.getItem("asset_id")
    }
    // set method
    const options = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }
    localStorage.removeItem("asset_id");
    // console.log(data);
     // add data
     try {
      const response = await fetch('/borrow', options);
      if (response.ok) {
          const data = await response.text();
          formBorrow.reset();
          Swal.fire({
            title: 'Borrow success!!',
            icon: 'success',
            confirmButtonText: 'Close',
            showCancelButton: false,
          }).then((result) =>{
            if(result.isConfirmed){
              getData();
            }
          })
      } else if(response.status == 500){
          const data = await response.text();
          throw Error(data);
      }
      else {
          const data = await response.text();
          throw Error(data);
      }
  } catch (err) {
      console.error(err.message);
      Swal.fire({
          icon: "error",
          title: "Error",
          text: err.message
      }
      );
      window.location.replace('/logout');
  }
  }

}

function logout() {
  Swal.fire({
    title: 'Do you want to sign out',
    color: '#FFA559',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FFA559',
    cancelButtonColor: '#FFE6C7',
    cancelButtonText: 'Cancel',
    confirmButtonText: 'Sure'

  }).then((result) => {
    if (result.isConfirmed) {
      window.location.replace('/logout');
    }
  });
}