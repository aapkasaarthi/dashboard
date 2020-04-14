let ipfs;

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

async function getStoredFiles() {

    let promise = new Promise((res, rej) => {

        Saarthi.fundCnt(function(error, result) {
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

async function refreshUI(){
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

async function showStoredFiles(){

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

    let nodeListElement = document.getElementById('fileList');
    const fileList = await getStoredFiles();
    console.log(fileList);
    fileList.forEach((file)=>{
        nodeListElement.innerHTML += getHtml(trimhash(file.hash),'Click to download')
    });



}

