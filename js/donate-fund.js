async function init(accounts) {
    refreshUI();

    document.getElementById("userAddress").innerText = trimAdd(accounts[0]);

    web3.getBalance(accounts[0]).then((balance)=>{
        document.querySelector("#userBalance").innerText = cleanWei(balance)+" ETH";
    })
}

async function refreshUI(){
    setupFunds();
};

async function setupFunds() {

    let query = `
    {
        funds {
          paymentReceiver
          fundIndex
          orgName
          fundName
          amountReceived
        }
    }
    `;

    querySubgraph(query).then((response)=>{
        console.log(response);
        response.funds.forEach(fund => {

            document.getElementById('fundList').innerHTML += `<div class="col-md-4 mt-4"> \
                <div class="card"> \
                    <div class="card-preview"> \
                        <img class="card-pic" src="/img/funds/${fund.orgName}.jpg" alt="" style=" max-height: 100px; "> \
                    </div> \
                    <div class="title title-2">${cleanWei(fund.amountReceived)} <span class="text-sm" style="margin-top:0;margin-bottom:0;"> ETH</span></div> \
                    <div class="title title-4"><a target='_blank' href="${chainExplorers[netId]}/address/${fund.paymentReceiver}">${fund.orgName}<a></div> \
                    <div class="card-text">${fund.fundName}</div> \
                    <div class="row form-group center" style="margin: 0 0 10px;"> \
                        <input class="form-control" type="number" placeholder="Amount 💰 (in ETH)" required="" id="donationAmount${fund.fundIndex}"> \
                    </div> \
                    <button class="btn btn-primary" onclick="donate(${fund.fundIndex})" style="width:100%;">Donate ❤️</button> \
                </div> \
            </div>`;
        });
    })
    .catch((err)=>{
        // console.error(err);
        handleError(err);
    })

}

function donate(_orgID) {

    let val = document.querySelector(`#donationAmount${_orgID}`).value;
    if (val == "" || parseFloat(val) == 0) {
        handleError("Invalid Amount");
    }
    else {
        Saarthi.donateToFund(parseInt(_orgID).toString(), {
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
