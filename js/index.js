let SaarthiContract = undefined;
let Saarthi = undefined;

const Web3Modal = window.Web3Modal.default;
const Fortmatic = window.Fortmatic;
const Torus = window.torus;

let web3Modal
let provider;
let selectedAccount;

window.addEventListener('load', async () => {

    console.log("Initializing Providers...");
    console.log("Fortmatic is", Fortmatic);
    console.log("Torus is", Torus);

    const providerOptions = {

        fortmatic: {
          package: Fortmatic,
          options: {
            key: "pk_test_391E26A3B43A3350",
            config: {
              rpcUrl: 'https://public-node.testnet.rsk.co/2.0.1',
              chainId: 31
            }

          }
        },

        torus: {
          package: Torus,
          options: {
            config: {
              network: {
                  host: "https://public-node.testnet.rsk.co/2.0.1",
                  chainId: 31,
                  networkName: "Matic Network"
              },
              enableLogging: true,
              buttonPosition: "bottom-left",
              buildEnv: "production",
              showTorusButton: true,
              enabledVerifiers: {
              }
            }
          }
        }
    };

    web3Modal = new Web3Modal({
        theme: "dark",
        cacheProvider: true,
        providerOptions,
    });

    if (web3Modal.cachedProvider == "") {
        provider = await web3Modal.connect();
        console.log("provider is");
        console.log(provider);
    }
    else{
        await web3Modal.connect();
    }

    if (typeof window.ethereum !== 'undefined') {

        ethereum.autoRefreshOnNetworkChange = false;
        ethereum.on('accountsChanged', function (accounts) {
            window.location.reload();
        })

        ethereum.on('chainChanged', function (netId) {
            if(netId != 31){
                Swal.fire({
                    icon: 'error',
                    title: 'Warning ⚠ - Wrong Network',
                    html: `Please switch to https://public-node.testnet.rsk.co/2.0.1`
                });
            }
        })

        if (provider){
            window.web3 = new Web3(provider);
            console.log("set provider is")
            console.log(provider)

        }else{
            window.web3 = new Web3(ethereum);
            console.log("set provider is")
            console.log(ethereum)
        }

        try {
                await ethereum.enable();

                ethereum.autoRefreshOnNetworkChange=false;

                web3.version.getNetwork((err, netId) => {
                    if(netId != 31){
                        Swal.fire({
                            icon: 'error',
                            title: 'Warning ⚠ - Wrong Network',
                            html: `Please switch to https://public-node.testnet.rsk.co/2.0.1`
                        });
                    }
                });

                SaarthiContract = web3.eth.contract(contractABI);
                Saarthi = SaarthiContract.at(contractAddress);

                await init();

        } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'MetaMask Rejected'
                });
        }


    } else if (window.web3) {

        console.log("Legacy Web3")

        web3.version.getNetwork((err, netId) => {
            if(netId != 31){
                Swal.fire({
                    icon: 'error',
                    title: 'Warning ⚠ - Wrong Network',
                    html: `Please switch to https://public-node.testnet.rsk.co/2.0.1`
                });
            }
        });
        SaarthiContract = new web3.eth.contract(contractABI);
        Saarthi = SaarthiContract.at(contractAddress);

        init();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'MetaMask Rejected',
            html: `Get a Web3 Compatible Browser like MetaMask or TrustWallet`
        });
    }
});

function format_two_digits(n) {return n < 10 ? '0' + n : n;}

function simpleDate(_timestamp = Date.now()){
    if(_timestamp == 0 ) return 0;
    const date1 = new Date(_timestamp*1000);
    hours = format_two_digits(date1.getHours());
    minutes = format_two_digits(date1.getMinutes());
    seconds = format_two_digits(date1.getSeconds());
    const format = date1.getDate() + "/" + (date1.getMonth()+1) + " " + hours + ":" + minutes + ":" + seconds
    return format;
}

function trimhash(_hash = "", w = 6){
    return _hash.slice(0, w) +"..."+ _hash.slice(_hash.length-w, _hash.length)
}

function trimAdd(_addr = ""){
    return _addr.slice(0, 5) +"..."+ _addr.slice(_addr.length-3, _addr.length)
}

function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text);

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

var addCommas = function(num) {
    var array = num.toString().split('');
    var index = -3;
    while (array.length + index > 0) {
        array.splice(index, 0, ',');
        index -= 4;
    }
    return array.join('');
};

function logout() {
    web3Modal.clearCachedProvider();
    window.location.reload();
};

function sendIPFSPinningRequests(_ipfsHash = ''){

    fetch(`https://ipfs.infura.io:5001/api/v0/pin/add?arg=/ipfs/${_ipfsHash}`, {
        method: 'POST',
        redirect: 'follow'
    })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    var myHeaders = new Headers();
        myHeaders.append("pinata_api_key", "22adbce12b4314b7e08b");
        myHeaders.append("pinata_secret_api_key", "1e746a0259982c83e47bb94e6b5295d546f006bbb8b8125173f4b5707c7d1756");
        myHeaders.append("Content-Type", "application/json");

    fetch("https://api.pinata.cloud/pinning/pinByHash", {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({"hashToPin":_ipfsHash}),
    })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}
