let Saarthi = undefined;

const Web3Modal = window.Web3Modal.default;
const Fortmatic = window.Fortmatic;
const Torus = window.torus;

let web3Modal
let provider;
let selectedAccount;

window.addEventListener('load', async () => {

    const providerOptions = {

        fortmatic: {
          package: Fortmatic,
          options: {
            key: "pk_test_391E26A3B43A3350",
          }
        },

        torus: {
          package: Torus,
          options: {
            network: "rinkeby",
            config: {
                enableLogging: true,
                buttonPosition: "bottom-left",
                buildEnv: "production",
                showTorusButton: true,
            }
          }
        }
    };

    web3Modal = new Web3Modal({
        theme: "dark",
        network: "rinkeby",
        cacheProvider: true,
        providerOptions,
    });

    if (web3Modal.cachedProvider == "") {
        provider = await web3Modal.connect();
        console.log("provider is", provider);
    }
    else{
        provider = await web3Modal.connectTo(web3Modal.cachedProvider);
        console.log("cached provider is", provider);
    }

    window.accounts = [];
    window.web3 = new ethers.providers.Web3Provider(provider);

    if (web3.provider.isMetaMask === true){
        ethereum.autoRefreshOnNetworkChange = false;
        if (provider && provider.on){
            provider.on('disconnect', ()=>{
                window.location.reload()
            });
            provider.on('chainChanged', ()=>{
                window.location.reload()
            });
            provider.on('accountsChanged', ()=>{
                window.location.reload()
            });
        }

        accounts = await ethereum.request({ method: 'eth_requestAccounts' });

        window.netId = parseInt(ethereum.chainId);

        if(Object.keys(supportedChains).includes(netId.toString()) === false){
            let alHtml = '<ul class="list-group list-group">';
            Object.keys(supportedChains).forEach((chainID)=>{
                alHtml+=`<li class="list-group-item">${supportedChains[chainID]}</li>`
            })
            alHtml += '</ul>';
            Swal.fire({
                icon: 'error',
                title: "Incorrect Network",
                html: `Please switch to a supported network below <br/><br/>` + alHtml
            });
        }
        else {
            setupContracts(accounts, netId);
        }

    }
    else if (web3.provider.isFortmatic === true){
        accounts = await web3.provider.enable();
        setupContracts(accounts, '4');
    }
    else if (web3.provider.isTorus === true){
        accounts = await web3.provider.enable();
        setupContracts(accounts, '4');
    }
    else {
        accounts = await web3.provider.enable();
        setupContracts(accounts, '4');
    }

});

function setupContracts(accounts, netId){
    Saarthi = new ethers.Contract(contractAddress[netId], contractABI, web3.getSigner());
    window.accounts = accounts;
    init(accounts);
}

function getAddress(){
    if (Boolean(web3.provider.selectedAddress) === true){
        return web3.provider.selectedAddress;
    }
    else if(web3.provider.isTrust){
        return web3.provider.address;
    }
}

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


function accountOnExp(_add = getAddress()){
    window.open(`https://explorer.testnet.rsk.co/address/${_add}`)
}

async function querySubgraph(query = '') {

    let promise = new Promise((res, rej) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var graphql = JSON.stringify({
        query: query
        })

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: graphql,
        redirect: 'follow'
        };

        fetch(graphqlEndpoint, requestOptions)
        .then(response => response.json())
        .then(result => res(result['data']))
        .catch(error => {
        console.log('error', error);
        res({})
        });

    });
    let result = await promise;
    return result;

}

function cleanWei(bn, dec=2){
    return parseFloat(ethers.utils.formatEther(bn)).toFixed(dec);
}
