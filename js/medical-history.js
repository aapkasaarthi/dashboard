async function init(accounts) {
    refreshUI();

    document.getElementById("userAddress").innerText = trimAdd(accounts[0]);

    web3.getBalance(accounts[0]).then((balance)=>{
        document.querySelector("#userBalance").innerText = cleanWei(balance)+" ETH";
    })
}

async function refreshUI(){
    showQR();
    setupUI();
};

async function setupUI() {

    let query = `
    {
        userHospitalBills (where: {id: "${getAddress()}"}){
            totalBilledAmount
            billsCount
        },
        campaigns(where:{campaigner:"${getAddress()}"}) {
            campaignEnabled
            amountReceived
        }
    }
    `;

    querySubgraph(query).then((response)=>{
        console.log(response);

        document.getElementById("medicalDues").innerText = cleanWei(response.userHospitalBills[0]?.totalBilledAmount);

        document.getElementById("donationsReceived").innerText = cleanWei(response.campaigns[0].amountReceived);
        if (response.campaigns[0].campaignEnabled == true){
            document.getElementById("campaignStatus").innerHTML = "Enabled"
            document.getElementById("campDetails").remove()
            document.getElementById("campStart").remove()
        }
        else{
            document.getElementById("campaignStatus").innerHTML = "Disabled"
            document.getElementById("campStop").remove()
        }
    })
    .catch((err)=>{
        // console.error(err);
        handleError(err);
    })

}

async function showQR(){
    var qrcode = new QRCode("qrcode", {
        text: ethereum.selectedAddress,
        width: 256,
        height: 256,
        colorDark : "#63f363",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}

async function getBytes32FromIpfsHash(ipfsListing) {

    await injectScript('./js/lib/bs58.bundle.js');
    return "0x" + bs58.decode(ipfsListing).slice(2).toString('hex')

}

async function startCampaign(){
    Saarthi.startCampaign(await getBytes32FromIpfsHash('QmR3VgpgJcGJZX4iazxBcvn2G7jHktLCdozaWF6Hp8DLLH'))
    .then((txnHash)=>{
        // TODO: Track Transaction status
    })
    .catch((err)=>{
        handleError(err);
    });
}

function stopCampaign(){
    Saarthi.stopCampaign()
    .then((txnHash)=>{
        // TODO: Track Transaction status
    })
    .catch((err)=>{
        handleError(err);
    });
}

async function toggleCampaign() {

    let promise = new Promise((res, rej) => {
        let data = document.getElementById('campDetails').value;
        Saarthi.methods.createCampaign(data).send({from:getAddress()},function(error, result) {
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
