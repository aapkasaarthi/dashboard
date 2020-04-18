let ipfs;
let fileHash = '';

async function init() {

    window.ethereum.on('accountsChanged', function (accounts) {
        location.reload();
    })

    document.getElementById("userAddress").innerText = trimAdd(ethereum.selectedAddress);

    web3.eth.getBalance(ethereum.selectedAddress, function(error, result) {
        document.getElementById("userBalance").innerText = parseFloat(web3.fromWei(result, "ether")).toFixed(2)+" ETH";
    })

    refreshUI();
}

async function refreshUI(){

    showReports()

    ipfs = window.IpfsHttpClient('ipfs.infura.io', '5001', { protocol: 'https' });

    $("#ipfsFile").on("change", function() {
        var reader = new FileReader();
        reader.onload = async function (e) {
            console.log("Uploading")
            const magic_array_buffer_converted_to_buffer = buffer.Buffer(reader.result);

            let promise = new Promise((res, rej) => {

                ipfs.add(magic_array_buffer_converted_to_buffer, (err, result) => {
                    if (!err){
                        res(result)
                    }
                })

            });
            let result = await promise;
            console.log(result);
            fileHash = result[0]['hash'];
        }
        reader.readAsArrayBuffer(this.files[0]);
    })

}

async function getLocation(){


    let promise = new Promise((res, rej) => {
        if (!navigator.geolocation){
            alert("No location Support");
            rej({
                latitude  : 0,
                longitude : 0
            })
        }
        else{

            navigator.geolocation.getCurrentPosition((position, error)=>{
                if (!error){
                    console.log(position);
                    res ({
                        latitude  : position.coords.latitude,
                        longitude : position.coords.longitude
                    })
                }
                else {
                    console.log(position);
                    rej ({
                        latitude  : 0,
                        longitude : 0
                    })
                }
            });
        }
    });
    let result = await promise;
    return result;

}

async function pickupCurrent(){

    const { latitude, longitude } = await getLocation();
    document.getElementById('location').value = `${latitude}, ${longitude}`;
}


async function submitReport() {

    let promise = new Promise((res, rej) => {

        let from = document.getElementById('from').value;
        let location = document.getElementById('location').value;
        let details = document.getElementById('details').value;


        Saarthi.fileReport(from, location,fileHash , details, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(false);
            }
        });

    });
    let result = await promise;
    return result;
}

async function getReportCnt() {

    let promise = new Promise((res, rej) => {

        Saarthi.reportCnt(function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    return result;
}

async function getReport(_index = 0) {

    let promise = new Promise((res, rej) => {

        Saarthi.Reports(_index, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    let dict = {
        userAddress:result[0],
        userName:result[1],
        location:result[2],
        file:result[3],
        details:result[4],
    }
    return dict;
}

async function getReports() {

    let promise = new Promise(async (res, rej) => {

        let reportCnt = parseInt(await getReportCnt());
        let reports = [];
        var i=0
        for(i=0;i<reportCnt;i++){
            let r= await getReport(i);
            reports.push(r);
        }
        res(reports);

    });
    let result = await promise;
    return result;
}

async function showReports(){

    let reports = await getReports();
    let reportEle = document.getElementById('reportList');
    reports.forEach(report => {
        let html = `
        <div class='card' style='margin: 30px;'>
            <div class='title title-4'>
                <a target='_blank' href='https://betav2-explorer.matic.network/address/0xbeb71662ff9c08afef3866f85a6591d4aebe6e4e'>
                    ${report.userName}
                </a>
            </div>
            <a>
                <div class='card-text'>
                    ${report.details}
                    <br><br>
                </div>
                <button class='btn btn-primary' onclick='showMap('${report.location}')' style='width:100%;'>View on Map 🗺</button>
                <br/><br/>
                <button class='btn btn-primary' onclick='viewReport('${report.file}')' style='width:100%;'>View Report 🕵️‍♀️</button>
            </a>
        </div>
        `;

        reportEle.innerHTML += html;
    });

}
