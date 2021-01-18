async function init(accounts) {
    refreshUI();

    document.getElementById("userAddress").innerText = trimAdd(accounts[0]);

    web3.getBalance(accounts[0]).then((balance)=>{
        document.querySelector("#userBalance").innerText = cleanWei(balance)+" ETH";
    })
}

async function refreshUI(){
    setupCampaigns();
};

async function setupCampaigns(){
    let query = `
    {
        campaigns {
            campaigner
              campaignEnabled
            donationCount
            amountReceived
            campaignHistory {
                campaignData
            }
        }
    }
    `;

    querySubgraph(query).then((response)=>{
        console.log(response);
        response.campaigns.forEach(campaign => {
            if (campaign.campaignEnabled == true){
                document.getElementById('CampaignList').innerHTML += `
                <div class="col-md-4 mt-4">
                    <div class="card">
                        <div class="title title-3">
                        <a target='_blank' href="${chainExplorers['netId']}/address/${campaign.campaigner}" >
                            ${trimAdd(campaign.campaigner)}
                        </a>
                        </div>
                        <div class="card-text">
                            ${campaign.campaignHistory[0].campaignData}
                        </div>
                        <div class="title title-2">${cleanWei(campaign.amountReceived)} <span class="text-sm" style="margin-top:0;margin-bottom:0;"> ETH</span></div>
                        <div class="row form-group center" style="margin: 0 0 10px;">
                            <input class="form-control" type="number" placeholder="Amount 💰 (in ETH)" required="" id = "dA${campaign.campaigner}">
                        </div>
                        <button class="btn btn-primary" onclick="donate('${campaign.campaigner}')">Donate ❤️</button>
                    </div>
                </div>`;
            }
        });
    })
    .catch((err)=>{
        // console.error(err);
        handleError(err);
    })
}

async function donate(_address) {

    let val = document.querySelector(`#dA${_address}`).value;
    if (val == "" || parseFloat(val) == 0) {
        handleError("Invalid Amount");
    }
    else {
        Saarthi.donateToCampaign(_address, {
            value:ethers.utils.parseEther(val)
        })
        .then((txnHash)=>{
            // TODO: Track Transaction status
        })
        .catch((err)=>{
            handleError(err);
        });
    }
}
