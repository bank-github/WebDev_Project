
getHisInfo();

// all asset
async function getHisInfo() {
    // use when error or success
    const His = document.querySelector('#his-info');
    // console.log('allList Element:', His);

    try {
        const result = await fetch('/borrows');
        // console.log('Server Response:', result);

        if (result.ok) {
            const data = await result.json();
            let content = '';
            if (data.length > 0) {
                data.forEach(history => {
                    const formatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
                    const lastReturnDate = new Date(history.update_status).toLocaleString(undefined, formatOptions);
                    const returnDate = new Date(history.return_date).toLocaleString(undefined, formatOptions);
                    const color = colorStatus(history.status);
                    const status = textStatus(history.status);
                    // display only (late but returned, reject, returned) [all asset returned history.update_status != null]
                    if (history.status != 1 && history.status != 2 && history.update_status != null) {
                        content += `
                        <div class="d-flex justify-content-center">
                            <div class="col-12 border border-3 border-dark rounded-4 m-3 p-2 bg-white shadow">
                                <div class="col mx-3">
                                    <h2 class="d-flex justify-content-between"><span>Asset: ${history.asset_name}</span><span ${color}>${status}</span></h2>`
                        // if reject
                        if (history.status == 3) {
                            content += `<h4 class="d-flex justify-content-between" ${color}><span>Return date: ${returnDate}</span><span>Reject when: ${lastReturnDate} By: aj</h4>`;
                        }
                        // if not reject
                        else {
                            content += `<h4 class="d-flex justify-content-between"${color}><span>Return date: ${returnDate}</span><span>${history.name} return when: ${lastReturnDate}</h4>`;
                        }
                        // have message or not
                        if (history.message != null) {
                            content += `<h4>Message: ${history.message}</h4>`
                        } else {
                            content += `<h4>Message: - </h4>`
                        }
                        content += `</div></div></div>`
                    }
                });
            } else {
                content = `<hr><h1 class="text-center">Has no borrow assets</h1>`;
            }
            // if borrow has data but has only status 1
            if (content == '') {
                content = `<hr><h1 class="text-center">Has no History assets</h1>`;
            }
            His.innerHTML = content;
        }
        else {
            const data = await result.text();
            His.innerHTML = data;
        }
    } catch (err) {
        console.error(err);
    }
}


function colorStatus(statusCode) {
    switch (statusCode) {
        case 1:
            return 'style="display:none"';
        case 2:
            return 'style="display:none"';
        case 3:
            return 'style="color: red;"';
        case 4:
            return 'style="color: green;"';
        case 5:
            return 'style="color: orange;"';
        default:
            return 'style="display:none"';
    }
}

function textStatus(statusCode) {
    switch (statusCode) {
        case 1:
            return 'Pending';
        case 2:
            return 'Approve';
        case 3:
            return 'Reject';
        case 4:
            return 'Returned';
        case 5:
            return 'Late';
        default:
            return 'unknow';
    }
}