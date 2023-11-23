// get all asset
async function getData() {
  // use when error or success
  const allAsset = document.querySelector('#all-asset');
  try {
    const result = await fetch('/assets');
    if (result.ok) {
      const data = await result.json();
      // console.log(data);
      let content = '';
      data.forEach(asset => {
          const assetData = JSON.stringify({ "id": asset.asset_id, "name": asset.asset_name });
          content += `<tr class="text-start ">
          <td><p>${asset.asset_id}</p></td>
          <td class="text-center"><img src="/public/img/${asset.image}" alt="asset image" height="100px"></td>
          <td id="name${asset.asset_id}"><a href="#" class="text-decoration-none text-dark text">${asset.asset_name}</a></td>
          <td><p class="text-ligther">${asset.detail}</p></td>`
          if (asset.asset_status == 0) {
            content += `<td class="text-center"><button class="btn btn-danger" disabled>Disable</button></td></tr>`;
          }
          else if (asset.asset_status == 1) {
            content += `<td class="text-center"><button id="${asset.asset_id}" class="btn bg-success text-white br-btn" onclick=getDetail(${assetData})>Borrow</button></td></tr>`;
          }
          else {
            content += `<td class="text-center"><button class="btn btn-secondary br-btn" disabled>Borrow</button></td></tr>`;
          }
      });
      // console.log(content);
      allAsset.innerHTML = content;
    } else {
      const data = await result.text();
      allAsset.innerHTML = data;
    }
  } catch (err) {
    console.error(err);
  }
}

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
  title.innerText = `Asset: ${asset.name}`;
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
        }).then((result) => {
          if (result.isConfirmed) {
            getData();
          }
        })
      } else if (response.status == 500) {
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
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.replace('/logout');
        }
      })

    }
  }

}

// logout function
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
      window.localStorage.clear();
      window.location.replace('/logout');
    }
  });
}

// when open page get data
getData();