
getHisInfo();

// all asset
async function getHisInfo() {
  // use when error or success
  const His = document.querySelector('#his-info');
  console.log('allList Element:', His);

  try {
    const result = await fetch('/user/history-info');
    console.log('Server Response:', result);

    if (result.ok) {
      const data = await result.json();
      let content = '';

      if (data.length > 0) {
        const info_st = data[0]; 
        const info_nd= data[1]; 
        const info_rd = data[2]; 
        content = `
        <div class="info-ht">
            <h3 class="ht2">${AssetName(info_st.asset_id)} Detail :</h3>
            <h3 class="ht6">${Status(info_st.status)}</h3>
            <h3 class="ht7">${info_st.message}</h3>
        </div>               
        <div class="info-ht">
            <h3 class="ht3">${AssetName(info_nd.asset_id)} Detail :</h3>
            <h3 class="ht6">${Status(info_nd.status)}</h3>
            <h3 class="ht7">${info_nd.message}</h3>
        </div>               
        <div class="info-ht">
            <h3 class="ht4">${AssetName(info_rd.asset_id)} Detail :</h3>
            <h3 class="ht9">${Status(info_rd.status)}</h3>
            <h3 class="ht8">${info_rd.message}</h3>
        </div>`;
      }

      His.innerHTML = content;
    } else {
      const data = await result.text();
      His.innerHTML = data;
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