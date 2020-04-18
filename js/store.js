let ipfs;

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

    showStoredFiles()
    showAccessors()

    ipfs = window.IpfsHttpClient('ipfs.infura.io', '5001', { protocol: 'https' });

    $("#ipfsFile").on("change", function() {
        var reader = new FileReader();
        reader.onload = function (e) {
            console.log("Uploading")
            const magic_array_buffer_converted_to_buffer = buffer.Buffer(reader.result);
            ipfs.add(magic_array_buffer_converted_to_buffer, (err, result) => {
                console.log(err, result);
            })
        }
        reader.readAsArrayBuffer(this.files[0]);
    })
}

async function getUserData(_userAddress = web3.eth.defaultAccount) {

    let promise = new Promise((res, rej) => {

        Saarthi.Users(_userAddress, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(false);
            }
        });

    });
    let result = await promise;
    let dict = {
        'userAddress':result[0],
        'recordHistoryCnt':parseInt(result[1]),
        'billAmount':parseFloat(web3.fromWei(result[2])).toFixed(2),
        'donationCnt':parseInt(result[3]),
        'hasCampaign':result[4],
        'campaignData':result[5],
        'hasAllowedResearch':result[6],
    }
    console.log(dict);
    return dict;
}

async function getStoredFile(_index = 0, _userAddress = web3.eth.defaultAccount) {

    let promise = new Promise((res, rej) => {

        Saarthi.getRecord(_userAddress, _index, function(error, result) {
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

async function getStoredFiles(_userAddress = web3.eth.defaultAccount) {

    let promise = new Promise(async (res, rej) => {

        const userData = await getUserData(_userAddress);
        const fileCnt = userData['recordHistoryCnt'];
        let resp = [];
        for (var i=0;i<fileCnt;i++){
            let data = await getStoredFile(i);
            resp.push(data);
        }
        res(resp);

    });
    let result = await promise;
    return result;
}

async function getAccessors() {

    let promise = new Promise(async (res, rej) => {

        Saarthi.getAccessors(function(error, result) {
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

async function showStoredFiles(){

    const getHtml = (title = "", text = "", data) => {
        return `
        <a class='vacancy-item' href="https://gateway.ipfs.io/ipfs/${data}"> \
        <div class='vacancy-title'>${title}</div> \
        <div class='vacancy-text'>${text}</div> \
        <div class='vacancy-arrow'> \
        <svg xmlns='http://www.w3.org/2000/svg' width='8' height='12' viewBox='0 0 8 12'> \
            <polygon points='0 10.59 4.58 6 0 1.41 1.41 0 7.41 6 1.41 12'></polygon> \
        </svg> \
        </div> \
        </a> \
        `
    };

    let nodeListElement = document.getElementById('fileList');
    const fileList = await getStoredFiles();
    console.log(fileList);
    fileList.forEach((file)=>{
        nodeListElement.innerHTML += getHtml(trimhash(file.hash),'Click to download', file.hash);
    });

}


async function showAccessors(){

    const getHtml = (title = "", text = "") => {
        return `
        <a class='vacancy-item' href="#"> \
        <div class='vacancy-title'>${title}</div> \
        <div class='vacancy-text'>${text}</div> \
        <div class='vacancy-arrow'> \
        <svg xmlns='http://www.w3.org/2000/svg' width='8' height='12' viewBox='0 0 8 12'> \
            <polygon points='0 10.59 4.58 6 0 1.41 1.41 0 7.41 6 1.41 12'></polygon> \
        </svg> \
        </div> \
        </a> \
        `
    };

    let nodeListElement = document.getElementById('allowed');
    const addresses = await getAccessors();
    addresses.forEach((addr)=>{
        nodeListElement.innerHTML += getHtml(trimAdd(addr),'Can Access');
    });

}
