async function init(accounts) {

    document.querySelector("#userAddress").innerText = trimAdd(accounts[0]);

    web3.getBalance(accounts[0]).then((balance)=>{
        document.querySelector("#userBalance").innerText = cleanWei(balance)+" ETH";
    })
    refreshUI();
    setInterval(updateStats, 60000);
}

async function refreshUI(){
    updateStats();
}

async function updateStats() {
    Saarthi.totalDonationAmount().then((amt)=>{
        document.querySelector('#totDon').innerText = cleanWei(amt);
    })

    fetch('https://corona.lmao.ninja/v2/countries/india')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        document.getElementById('statCases').innerText = addCommas(data['cases']);
        document.getElementById('statDeaths').innerText = addCommas(data['deaths']);
        document.getElementById('statRecovered').innerText = addCommas(data['recovered']);
    });

}

function checkResult(event){
    event.preventDefault();
    const submitBtn = document.getElementById("submit");

    submitBtn.innerText = "Crunching Numbers";
    submitBtn.disabled = true;

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
            fetch('http://ip-api.com/json/')
            .then(response => response.json())
            .then(locData => {
                Swal.fire({
                    title: `Probability of Infection: 90%`,
                    icon: 'warning',
                    html: 'There is a severe chance that you may have coronavirus.',
                    showCloseButton: true,
                    showCancelButton: true,
                    focusConfirm: true,
                    confirmButtonText:'Call to Get Help',
                    confirmButtonAriaLabel: 'Help',
                    cancelButtonText:'Close',
                    cancelButtonAriaLabel: 'Close'
                }).then((result) => {
                    if (result.value === true) {
                        if(Object.keys(corona_helpline_numbers_india).includes(locData['region'])=== true){
                            window.open(`tel:${corona_helpline_numbers_india[locData['region']]}`);
                        }
                        else{
                            window.open(`tel:${corona_helpline_numbers_india['OT']}`);
                        }
                    }
                })
            });


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
