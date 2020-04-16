
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
    getFundDetails();
};
