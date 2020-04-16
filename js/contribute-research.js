
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
    await updateStatus();
};


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
    // console.log(dict);
    return dict;
}

async function enableResearch() {

    let promise = new Promise((res, rej) => {

        Saarthi.allowAccessToResearch(function(error, result) {
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

async function disableResearch() {

    let promise = new Promise((res, rej) => {

        Saarthi.revokeAccessToResearch(function(error, result) {
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


async function updateStatus() {

    let btn = document.getElementById('status');
    let details = document.getElementById('statusDetails');
    let {hasAllowedResearch} = await getUserData();
    if (hasAllowedResearch == true){
        btn.innerText = "Opt Out ❌"
        btn.addEventListener("click", disableResearch);
        details.innerText = "Thank you for helping those in need by contributing your data towards Research and Development 🎓"
    }
    else {
        btn.innerText = "Opt In 💪"
        btn.addEventListener("click", enableResearch);
        details.innerText = "Help those in need by contributing your data towards Research and Development 🎓"
    }
}
