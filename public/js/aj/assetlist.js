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
            content += `<tr class="text-start">
            <td><p>${asset.asset_id}</p></td>
            <td class="text-center"><img src="/public/img/${asset.image}" alt="asset image" height="40px"></td>
            <td id="name${asset.asset_id}"><a href="#" class="text-decoration-none text-dark">${asset.asset_name}</a></td>
            <td><p>${asset.detail}</p></td>`
            if (asset.asset_status == 0) {
              content += `<td class="text-center"><button class="btn btn-danger" disabled>Disable</button></td></tr>`;
            }
            else if (asset.asset_status == 1) {
              content += `<td class="text-center"><button class="btn btn-success" disabled>Enable</button></td></tr>`;
            }
            else {
              content += `<td class="text-center"><button class="btn btn-secondary" disabled>Borrow</button></td></tr>`;
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