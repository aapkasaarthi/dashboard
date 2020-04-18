
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
    getCampaigns();
};

async function getCampaignCnt() {

    let promise = new Promise((res, rej) => {

        Saarthi.campaignCnt(function(error, result) {
            if (!error)
                res(result);
            else{
                rej(false);
            }
        });

    });
    let result = await promise;
    return parseInt(result);
}

async function getCampaignAddress(_index = 0) {

    let promise = new Promise((res, rej) => {

        Saarthi.Campaigns(_index, function(error, result) {
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

async function getCampaign(_address = ethereum.selectedAddress) {

    let promise = new Promise((res, rej) => {

        Saarthi.Users(_address, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(false);
            }
        });

    });
    let result = await promise;
    let dict = {
        userAddress : result[0],
        billAmount: parseFloat(web3.fromWei(result[2])).toFixed(2),
        donationCnt: parseInt(result[3]),
        hasCampaign: result[4],
        campaignData: result[5],
    }
    return dict;
}


async function getCampaigns() {

    let promise = new Promise(async (res, rej) => {

        const campaignCnt = await getCampaignCnt();
        for (var i=0;i<campaignCnt;i++){
            let {userAddress, billAmount, donationCnt, hasCampaign, campaignData} = await getCampaign(await getCampaignAddress(i));

            if (userAddress != "0x0000000000000000000000000000000000000000"){
                document.getElementById('CampaignList').innerHTML += `\
                <div class="col-md-4 mt-4"> \
                    <div class="card"> \
                        <div class="title title-3"> \
                        <a target='_blank' href="https://betav2-explorer.matic.network/address/${userAddress}" > \
                            ${trimAdd(userAddress)} \
                        </a> \
                        </div> \
                        <div class="card-text"> \
                            ${campaignData} \
                        </div> \
                        <div class="title title-2">${billAmount} <span class="text-sm" style="margin-top:0;margin-bottom:0;">ETH</span></div> \
                        <div class="row form-group center" style="margin: 0 0 10px;"> \
                            <input class="form-control" type="number" placeholder="Donation Amount 💰" required="" id = "dA${userAddress}"> \
                        </div> \
                        <button class="btn btn-primary" onclick="donate('${userAddress}')">Donate ❤️</button> \
                    </div> \
                </div>`;
            }



        }

        res(true);

    });

    let result = await promise;
    return result;

}

async function donate(_address) {

    let promise = new Promise((res, rej) => {

        let donationValueEle = document.getElementById(`dA${_address}`);
        let donationValue = parseFloat(donationValueEle.value);
        Saarthi.donateToUser(_address, {value: web3.toWei(donationValue, 'ether')},function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    return parseInt(result);
}
