

let asset = [];
let borrow = [];

function showdata() {
    // ! Amount of assets
    var amount_asset = document.querySelector('#amount-assets');
    
    amount_asset.innerHTML = `<h4 class="content_text">Amount of assets : ${asset.length} </h4> `;
    amount_asset.onclick = function () {
      location.replace('/admin/assetlist');
    }
    var borrowing = 0;
    for (const iterator of borrow) {
      if ((iterator.status == 2 || iterator.status == 5) && iterator.update_status == null) {
        borrowing+=1;
      }
    }
    // ! Amount of borrowing
    var amount_borrow  = document.querySelector('#amount-borrow');
    amount_borrow.innerHTML = `<h4 class="content_text" >Borrow of assets : ${borrowing} </h4> `;
    amount_borrow.onclick = function () {
      location.replace('/admin/return');
    }

    // ! avaliable disavaliable
    // var xassetstatus = ["asset-avaliable", "asset-disavaliable"];
    // var yassetstatus = [55,20];
    // var barColors = ["orange", "black"];
    var asset_avaliable = 0;
    var asset_disavaliable = 0;
    var asset_borrowed = 0;
    for (const iterator of asset) {
        if (iterator.asset_status == 0) {
          asset_disavaliable+=1;
        }else if(iterator.asset_status == 2){
          asset_borrowed+=1;
        }
        else{
          asset_avaliable+=1;
        }
    }

    var xassetstatus = ["asset-avaliable", "asset-disavaliable", "asset_borrowed",""];
    var yassetstatus = [asset_avaliable, asset_disavaliable, asset_borrowed,0];
    var barColors = ["red", "black","orange",""];
    new Chart("rate-of-returned", {
    type: "bar",
    data: {
    labels: xassetstatus,
    datasets: [{
      backgroundColor: barColors,
      data: yassetstatus
    }]
  },    options: {
    legend: {display: false},
    title: {
      display: true,
      text: "asset status"
    }
  }
});
    
    
    
    // ! allstatus
    var avaliable = 0;
    var approve = 0;
    var reject = 0;
    var pending = 0;
    var late = 0;
    var missing = 0;
    console.log(borrow);
        for (const iterator of borrow) {
            if (iterator.status==1) {
                pending +=1;            
            }else if(iterator.status==2){
                approve +=1;
            }
            else if(iterator.status==3){
                reject +=1;
            }
            else if(iterator.status==5){
                late +=1;
            }
            else if(iterator.status==6){
                missing +=1;
            }
        }
    
    avaliable = asset.length - borrowing ;
    console.log(avaliable + ' '+pending+' '+approve +' '+reject+' '+late+' '+missing);
    console.log();
    var xValues = ["avaliable","approve", "reject", "pending", "late", "missing"];
    var yValues = [avaliable, approve, reject, pending, late,missing];
    var barColors = ["green", "yellow","red","orange","brown","black"];
    
     new Chart("rate-of-approve", {
        type: "pie",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        },
        options: {
          title: {
            display: true,
            text: "All status"
          }
        }
      });
    
}


async function getBorrow() {
  const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
  }
  try {
      const response = await fetch('/borrows',options);
      if (response.ok) {
          borrow = await response.json();                           
          console.log(asset);
          console.log(borrow);
          showdata();
           
      }
      else {
          throw Error('Connection error');
      }
  } catch (error) {
      console.error(error.message);
      alert(error.message);
  }

}

async function getasset() {
  const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
  }
  try {
      const response = await fetch('/assets',options);
      if (response.ok) {
          asset = await response.json();
          getBorrow();
          
      }
      else {
          throw Error('Connection error');
      }
  } catch (error) {
      console.error(error.message);
      alert(error.message);
  }

}









getasset() ;