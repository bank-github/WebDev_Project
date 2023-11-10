
    getList();

// all asset
async function getList() {
  // use when error or success
  const allList = document.querySelector('#all-list');
  console.log('allList Element:', allList);

  try {
    const result = await fetch('/user/list-all');
    console.log('Server Response:', result);

    if (result.ok) {
      const data = await result.json();
      let content = '';

      if (data.length > 0) {
        const borrow = data[0]; 
        const borrow_nd = data[1]; 
        const borrow_rd = data[2]; 
        const borrow_th = data[3]; 
        
        const formatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDateND = new Date(borrow_nd.borrow_date).toLocaleString(undefined, formatOptions);
        const formattedDateRD = new Date(borrow_rd.borrow_date).toLocaleString(undefined, formatOptions);
        const formattedDateTH = new Date(borrow_th.borrow_date).toLocaleString(undefined, formatOptions);
        const formattedDate = new Date(borrow.borrow_date).toLocaleString(undefined, formatOptions);

        content = `
        <div class="col-md-4">
        <h2 class="rounded-heading">In Process</h2>
    </div> 
        <div class="row">
          <div class="col-md-4">
            <h3 class="rounded-2heading">ASSET ${ AssetName(borrow_nd.asset_id)}</h3>
            <h3 class="rounded-3heading">ASSET ${ AssetName(borrow_rd.asset_id)}</h3>
            <h3 class="rounded-4heading">ASSET ${ AssetName(borrow_th.asset_id)}</h3>
            <h3 class="rounded-5heading">ASSET ${ AssetName(borrow.asset_id)}</h3>
          </div>
          <div class="col-md-4">
            <div class="row">
              <h4 class="inline-text">
                Start: <span>${formattedDateND}</span><span id="endDate"></span>
              </h4>
              <h4 class="inline-text2">
                End: <span>${formattedDateRD}</span>
              </h4>
              <h4 class="inline-text3">
                Start: <span>${formattedDateTH}</span><span id="endDate">1</span>
              </h4>
              <h4 class="inline-text4">
                End: <span >${formattedDate}</span>
              </h4>
            </div>
          </div>
          <div class="col-md-2">
            <h5 class="status2">${Status(borrow_nd.status)}</h5>
            <h5 class="status3">${Status(borrow_rd.status)}</h5>
            <h5 class="status4">${Status(borrow_th.status)}</h5>
            <h5 class="status5">${Status(borrow.status)}</h5>
          </div>
          <div class="col-md-2">
            <button class="btn" id="green-button" onclick="showReturned()">
              <i class="fas fa-check"></i>
            </button>
            <button class="btn" id="warning-button" onclick="showNotReturned()">
              <i class="fas fa-exclamation-circle"></i> 
            </button>
            <button class="btn" id="green2-button" onclick="showReturnedAgain()">
              <i class="fas fa-check"></i> 
            </button>
            <button class="btn" id="problems-button" onclick="showAssetLost()">
              <i class="fa fa-address-book"></i> 
            </button>
          </div>
        </div>`;
      }

      allList.innerHTML = content;
    } else {
      const data = await result.text();
      allList.innerHTML = data;
    }
  } catch (err) {
    console.error(err);
  }
}


function Status(statusCode) {
    switch (statusCode) {
        case 0:
            return 'Free';
        case 1:
            return 'Pending';
        case 2:
            return 'Approved';
        case 3:
            return 'Rejected';
        case 4:
            return 'Returned';
        case 5:
            return 'Late';
        default:
            return 'Unknown Status';
    }
}

function AssetName(byId) {
  switch (byId) {
      case 1:
          return 'networkbook';
      case 2:
          return 'air-purifier';
      case 3:
          return 'chair';    
      case 4:
          return 'air-conditioner';           
      case 5:
          return 'fan';
      case 6:
          return 'notebook';    
      case 7:
          return 'printer';
      case 8:
          return 'table';
      case 9:
          return 'monitor';      
      case 10:
          return 'vacuum-cleaner';  
      case 11:
          return 'mouse';
      case 12:
          return 'keyboard';      
      default:
          return 'Unknown Asset';
  }
}