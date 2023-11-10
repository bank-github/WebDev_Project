// when open page get data
getData();

// all asset
async function getData() {
  // use when error or success
  const allAsset = document.querySelector('#all-asset');

  try {
    const result = await fetch('/user/main-all');
    if (result.ok) {
      const data = await result.json();
      let content = '';
      data.forEach(asset => {
        content += `<tr class="text-start">
          <td class="text-center"><img src="/public/img/${asset.image}" alt="asset image" height="40px"></td>
          <td id="name${asset.asset_id}"><a href="#" class="text-decoration-none text-dark">${asset.asset_name}</a></td>
          <td><p>
          ${asset.detail}
          </p></td>
          <td class="text-center"><button id="${asset.asset_id}" class="btn btn bg-success text-white" onclick=getDetail(${JSON.stringify(asset)})>Borrow</button></td>
      </tr>`
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
function searchAsset(){
  var input = document.querySelector('#txtsearch');
  var filter = input.value.toUpperCase();
  var tbody = document.querySelector('#all-asset');
  var tr = tbody.getElementsByTagName('tr');
  // console.log(tr[0].getElementsByTagName('a')[0].textContent)
  for(var i=0;i<tr.length;i++){
    var td = tr[i].getElementsByTagName('a')[0];
    console.log(td)
    var name = td.textContent || td.innerText;
    if(name.toUpperCase().indexOf(filter) > -1){
      tr[i].style.display = '';
    }else{
      tr[i].style.display = 'none';
    }
  }
}

//get detail asset 
function getDetail(asset){
  const myModal = new bootstrap.Modal(document.getElementById('modalId'));
  const title = document.querySelector('#modalTitleId');
  title.innerText = `Borrow: ${asset.asset_name}`;
  myModal.show();
  console.log(asset);
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