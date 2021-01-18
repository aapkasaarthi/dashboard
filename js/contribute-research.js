async function init(accounts) {
    refreshUI();

    document.getElementById("userAddress").innerText = trimAdd(accounts[0]);

    web3.getBalance(accounts[0]).then((balance)=>{
        document.querySelector("#userBalance").innerText = cleanWei(balance)+" ETH";
    })
}

async function refreshUI(){
    await updateStatus();
};

async function updateStatus(){
    let query = `
    {
        approvals(where: {from:"${getAddress()}", to:"${RESEARCH_ADDRESS}", state:true}) {
          state
        }
      }
    `;

    querySubgraph(query).then((response)=>{
        console.log(response);

        let btn = document.getElementById('status');
        btn.addEventListener("click", toggleApproval);

        let details = document.getElementById('statusDetails');
        if (response.approvals.length != 0){
            btn.innerText = "Opt Out ❌"
            details.innerText = "Thank you for helping those in need by contributing your data towards Research and Development 🎓"
        }
        else {
            btn.innerText = "Opt In 💪"
            details.innerText = "Help those in need by contributing your data towards Research and Development 🎓"
        }
    })
    .catch((err)=>{
        // console.error(err);
        handleError(err);
    })
}

function toggleApproval() {

    Saarthi.toggleAccessToAddress(getAddress())
    .then((txnHash)=>{
        // TODO: Track Transaction status
    })
    .catch((err)=>{
        handleError(err);
    });
}
