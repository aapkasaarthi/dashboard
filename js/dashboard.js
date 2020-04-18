async function init() {

    window.ethereum.on('accountsChanged', function (accounts) {
        location.reload();
    })

    document.getElementById("userAddress").innerText = trimAdd(ethereum.selectedAddress);

    web3.eth.getBalance(ethereum.selectedAddress, function(error, result) {
        document.getElementById("userBalance").innerText = parseFloat(web3.fromWei(result, "ether")).toFixed(2)+" ETH";
    })

    refreshUI();
    setInterval(updateStats, 60000);
}

async function updateStats(){
    document.getElementById('totDon').innerText = await getDonationAmount();

    fetch('https://corona.lmao.ninja/v2/countries/india')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        document.getElementById('statCases').innerText = addCommas(data['cases']);
        document.getElementById('statDeaths').innerText = addCommas(data['deaths']);
        document.getElementById('statRecovered').innerText = addCommas(data['recovered']);
        console.log(data);
    });

}

async function refreshUI(){
    await updateStats();
}

function checkResult(event){
    event.preventDefault();
    const submitBtn = document.getElementById("submit");

    submitBtn.innerText = "Crunching Numbers";
    submitBtn.disabled = true;

    var xhr = new XMLHttpRequest();
    let fever = parseInt(document.getElementById('fever').value);
    let feverDays = parseInt(document.getElementById('feverDays').value);
    let age = parseInt(document.getElementById('age').value);
    let tiredness = parseInt(document.getElementById('tiredness').value);
    let cough = parseInt(document.getElementById('cough').value);

    let testURL = `${TESTER_NODE}?fever=${fever}&feverDays=${feverDays}&age=${age}&tiredness=${tiredness}&cough=${cough}`
    fetch(testURL)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data['result']);
        const prob = parseFloat(data['result']).toFixed(2);

        if (prob>=70){
            Swal.fire({
                icon: 'warning',
                title: `Probability of Infection: ${prob}%`,
                text: `There is a severe chance that you may have coronavirus.`,
                footer: '<a target="_blank" href="https://www.mohfw.gov.in/pdf/coronvavirushelplinenumber.pdf">Get Help 🥺</a>'
              })
        }
        else if (prob>=50){
            Swal.fire({
                icon: 'warning',
                title: `Probability of Infection: ${prob}%`,
                text: `There is a good chance that you may have coronavirus.`,
                footer: '<a target="_blank" href="https://www.mohfw.gov.in/pdf/coronvavirushelplinenumber.pdf">Get Help 🥺</a>'
              })
        }
        else {
            Swal.fire({
                icon: 'warning',
                title: `Probability of Infection: ${prob}%`,
                text: 'There is a slim chance you have coronavirus although you should sill self quarantine for 2 weeks.',
                footer: '<a target="_blank" href="https://www.mohfw.gov.in/pdf/coronvavirushelplinenumber.pdf">Get Help 🥺</a>'
              })
        }

        submitBtn.innerText = "Let's check 🤞";
        submitBtn.disabled = false;
    });

}

async function getDonationAmount(_orgID) {

    let promise = new Promise((res, rej) => {

        Saarthi.totalDonationAmount((error, result)=>{
            if (!error)
                res(result);
            else{
                rej(0);
            }
        });

    });
    let result = await promise;
    return web3.fromWei(parseInt(result));
}
