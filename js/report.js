let fileHash = '';
let storage;

async function init(accounts) {
    refreshUI();

    document.getElementById("userAddress").innerText = trimAdd(accounts[0]);

    web3.getBalance(accounts[0]).then((balance)=>{
        document.querySelector("#userBalance").innerText = cleanWei(balance)+" ETH";
    })

}

async function getBytes32FromIpfsHash(ipfsListing) {

    await injectScript('./js/lib/bs58.bundle.js');
    return "0x" + bs58.decode(ipfsListing).slice(2).toString('hex')

}

async function refreshUI(){

    setupReports()

    storage = IpfsHttpClientLite({apiUrl: 'https://ipfs.infura.io:5001'})

    $("#ipfsFile").on("change", function() {
        var reader = new FileReader();
        reader.onload = async function (e) {
            console.log("Uploading")
            await injectScript('./js/lib/buffer@5.2.1.js');
            const magic_array_buffer_converted_to_buffer = buffer.Buffer(reader.result);
            let promise = new Promise((res, rej) => {

                storage.add(magic_array_buffer_converted_to_buffer, (err, result) => {
                    if (!err){
                        res(result)
                    }
                    else{
                        rej(err)
                    }
                })

            });
            let result = await promise;
            fileHash = result[0]['hash'];
            sendIPFSPinningRequests(fileHash);
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
    document.getElementById('location').value = `${latitude}~${longitude}`;
}

async function submitReport() {

    let location = document.getElementById('location').value;
    let details = document.getElementById('details').value;
    Saarthi.fileReport(
        ethers.utils.formatBytes32String(location),
        await getBytes32FromIpfsHash(fileHash),
        details
    ).then((txnHash)=>{
        // TODO: Track Transaction status
    })
    .catch((err)=>{
        handleError(err);
    });
}

async function setupReports(){
    let query = `
    {
        reportDatas {
            id
            totalReports
            reports{
                id
                reportIndex
                reporter
                location
                file
                details
                reportedOn
            }
        }
    }
    `;

    querySubgraph(query).then((response)=>{
        console.log(response);
        response.reportDatas[0].reports.forEach(report => {
            document.getElementById('reportList').innerHTML += `
            <div class='card' style='margin: 30px;padding: 20px 20px'>
                <div class="col" style="display: flex;justify-content:space-around;padding-bottom :10px;">
                    <a target='_blank' href='${chainExplorers['netId']}/address/${report.reporter}'>
                        ${trimAdd(report.reporter)}
                    </a>
                    <a target='_blank' href='https://ipfs.infura.io/ipfs/${report.file}'>
                        View Report 🕵️‍♀️
                    </a>
                </div>
                <div style="width: 100%">
                <iframe width="100%" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
                    src="https://www.bing.com/maps/embed?h=400&w=500&cp=37.4221~122.0841&lvl=13&typ=d&sty=r&src=SHELL&FORM=MBEDV8">
                </iframe>
                </div>
                <p>
                    ${report.details}
                    <br>
                </p>
            </div>
            `;
        });
    })
    .catch((err)=>{
        // console.error(err);
        handleError(err);
    })
}
