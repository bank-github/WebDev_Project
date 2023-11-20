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

async function readData() {
    try {
        const response = await fetch('/borrows');
        if (response.ok) {
            const data = await response.json();
            let product_d = '';
            var status1 = 0;
            var status2 = 0;
            var status5 = 0;

            data.forEach(function (p) {

                if (p.status === 1) {
                    status1++;
                }

                if (p.status === 2) {
                    status2++;
                }
                if (p.status === 5) {
                    status5++;
                }
            });
            product_d = `
                <div class="container-fluid mt-5 mb-5">
                    <div class="row content">
                        <div class="col-sm-9">
                            <div class="row d-flex justify-content-center align-items-center">
                                <div class="col-sm-3">
                                    <div class="card custom-card">
                                        <div class="card-body">
                                            <h4 class="card-title">Amount: ${status1}</h4>
                                            <p class="card-text">Amount of request</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="card custom-card">
                                        <div class="card-body">
                                            <h4 class="card-title">Amount: ${status2}</h4>
                                            <p class="card-text">Amount of borrowing</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="card custom-card">
                                        <div class="card-body">
                                            <h4 class="card-title">Amount: ${status5}</h4>
                                            <p class="card-text">Amount of late return</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div class="row content">
                        <div class="col-sm-9">
                            <div class="row">
                                <div class="col-sm-12 text-center">
                                    <canvas id="myChart" class="centered-canvas" style="max-width: 600px;"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> `;
            document.querySelector('#item_list').innerHTML = product_d;
                var xValues = ["Amount of request", "Amount of borrowing", "Amount of late return"];
                var yValues = [status1, status2, status5];
                var barColors = [
                    "#b91d47",
                    "#2b5797",
                    "#00aba9"
                ];

                new Chart("myChart", {
                    type: "pie",
                    data: {
                        labels: xValues,
                        datasets: [{
                            backgroundColor: barColors,
                            data: yValues
                        }]
                    },

                });
                document.querySelector('.centered-canvas').style.marginTop = '70px';
        }
        else if (response.status == 500) {
            const data = response.text();
            throw Error(data);
        }
    }
    catch (err) {
        console.error(err.message);
        Notiflix.Report.failure('Error', err.message, 'Close');
    }
}

readData();

