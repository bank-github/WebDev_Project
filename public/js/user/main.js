// when open page get data
getData();

async function getData(){
  // use when error or success
  const allAsset = document.querySelector('#all-asset');
  
  try {
    const result = await fetch('/user/main-all');
    if(result.ok){
      const data = await result.json();
      let content = '';
      data.forEach(asset => {
          content += `<a id=${asset.asset_id} class="col text-decoration-none mt-4" href="#">`;
          content += `<div class="card-group text-center" style="width: 15rem;">`;
          content += `<div class="card" style="height: 500px;">`;
          content += `<img class="card-img-top p-3" src="/public/img/${asset.image}" alt="img asset">`;
          content += `<div class="card-body">`;
          content += `<h3 class="card-title">${asset.name}</h3>`;
          content += `</div></div></div></a>`;
      });
      // console.log(content);
      return allAsset.innerHTML = content;
    }else{
      const data = await result.text();
      return allAsset.innerHTML = data;
    }
  } catch (err) {
    console.error(err);
  }
}

// sign out
document.querySelector('#signout').onclick = function(){
    // alert('ok');
    Swal.fire({
        title: 'Do you want to sign out',
        color:'#FFA559',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FFA559',
        cancelButtonColor: '#FFE6C7',
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Sure'
        
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.replace('/');
        }
      });
}

// all asset

