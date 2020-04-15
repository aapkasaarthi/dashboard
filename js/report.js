let ipfs;
let fileHash = '';

async function init() {

    window.ethereum.on('accountsChanged', function (accounts) {
        location.reload();
    })

    document.getElementById("userAddress").innerText = trimAdd(web3.eth.accounts[0]);

    web3.eth.getBalance(web3.eth.accounts[0], function(error, result) {
        document.getElementById("userBalance").innerText = parseFloat(web3.fromWei(result, "ether")).toFixed(2)+" ETH";
    })

    refreshUI();
}

async function refreshUI(){

    ipfs = window.IpfsHttpClient('ipfs.infura.io', '5001', { protocol: 'https' });

    $("#ipfsFile").on("change", function() {
        var reader = new FileReader();
        reader.onload = function (e) {
            console.log("Uploading")
            const magic_array_buffer_converted_to_buffer = buffer.Buffer(reader.result);
            ipfs.add(magic_array_buffer_converted_to_buffer, (err, result) => {
                if (!err){
                    fileHash = result.hash;
                }
            })
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

    const from = document.getElementById('from').value;
    const location = document.getElementById('location').value;
    const details = document.getElementById('details').value;

    let promise = new Promise((res, rej) => {

        Saarthi.fileReport(from, location, fileHash, details, function(error, result) {
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
