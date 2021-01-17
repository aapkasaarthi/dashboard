const contractABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_campaigner","type":"address"}],"name":"campaignStopped","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_hospital","type":"address"},{"indexed":false,"internalType":"bool","name":"_newState","type":"bool"}],"name":"hospitalUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"taskID","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"_modelHash","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"_time","type":"uint256"}],"name":"modelUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"bool","name":"_finalState","type":"bool"}],"name":"newApproval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_hospital","type":"address"},{"indexed":true,"internalType":"address","name":"_billedUser","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"newBill","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_campaigner","type":"address"},{"indexed":false,"internalType":"bytes32","name":"_campaignData","type":"bytes32"}],"name":"newCampaign","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_campaigner","type":"address"},{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"newCampaignDonation","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_fundIndex","type":"uint256"},{"indexed":true,"internalType":"bytes32","name":"_orgName","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"_fundName","type":"bytes32"},{"indexed":true,"internalType":"address","name":"_paymentReceiver","type":"address"}],"name":"newFund","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_fundIndex","type":"uint256"},{"indexed":true,"internalType":"address","name":"_sender","type":"address"},{"indexed":true,"internalType":"address","name":"_receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"newFundDonation","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_index","type":"uint256"},{"indexed":true,"internalType":"address","name":"_reporter","type":"address"},{"indexed":true,"internalType":"bytes32","name":"_location","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"_file","type":"bytes32"},{"indexed":false,"internalType":"string","name":"_details","type":"string"},{"indexed":false,"internalType":"uint256","name":"_time","type":"uint256"}],"name":"newReport","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"taskID","type":"uint256"},{"indexed":true,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"bytes32","name":"_modelHash","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"_amt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_time","type":"uint256"}],"name":"newTaskCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_updater","type":"address"},{"indexed":true,"internalType":"uint256","name":"_reportIndex","type":"uint256"},{"indexed":false,"internalType":"string","name":"_action","type":"string"}],"name":"updateReport","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"Campaigns","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"Funds","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"SaarthiTasks","outputs":[{"internalType":"uint256","name":"taskID","type":"uint256"},{"internalType":"uint256","name":"currentRound","type":"uint256"},{"internalType":"uint256","name":"totalRounds","type":"uint256"},{"internalType":"uint256","name":"cost","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"UserTaskIDs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"activeCampaignCnt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"approval","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"billAmounts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_amt","type":"uint256"}],"name":"billUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"campaignEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"coordinatorAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_orgName","type":"bytes32"},{"internalType":"bytes32","name":"_fundName","type":"bytes32"},{"internalType":"address payable","name":"_paymentReceiver","type":"address"}],"name":"createFund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_modelHash","type":"bytes32"},{"internalType":"uint256","name":"_rounds","type":"uint256"}],"name":"createTask","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"donateToCampaign","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fundIndex","type":"uint256"}],"name":"donateToFund","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_location","type":"bytes32"},{"internalType":"bytes32","name":"_file","type":"bytes32"},{"internalType":"string","name":"_details","type":"string"}],"name":"fileReport","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"fundCnt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"hospitals","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"nextTaskID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reportCnt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_campaignData","type":"bytes32"}],"name":"startCampaign","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stopCampaign","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"toggleAccessToAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"toggleHospital","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"togglePause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalDonationAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDonationCnt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newAdmin","type":"address"}],"name":"updateAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_taskID","type":"uint256"},{"internalType":"bytes32","name":"_modelHash","type":"bytes32"},{"internalType":"address payable","name":"_computer","type":"address"}],"name":"updateModelForTask","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_reportIndex","type":"uint256"},{"internalType":"string","name":"_action","type":"string"}],"name":"updateReportStatus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

const supportedChains = {
	'4':'Ethereum Rinkeby Testnet',
	'80001': 'Matic Network Mumbai Testnet'
}

const chainExplorers = {
	'4':'https://rinkeby.etherscan.io',
	'80001': 'https://mumbai-explorer.matic.today'
}

const contractAddress = {
	'4':'0x72624c794c508f8d2f3bf65d6b363118d9d6e39e',
	'80001': '0x91E42B79318e6C5fd36f6f89bF8bd964478bEEb7'
}

const blockNumbers = {
	'4':'7881791',
	'80001': '7867409'
}

const COORDINATOR_NODE = "https://saarthi-coor.herokuapp.com/";
const TESTER_NODE = "https://covidsymptomtester.herokuapp.com/";


const corona_helpline_numbers_india = {
    "AD":"08662410978",
    "AR":"9436055743",
    "AS":"6913347770",
    "BR":"104",
    "CG":"104",
    "DL":"01122307145",
    "GA":"104",
    "GJ":"104",
    "HR":"8558893911",
    "HP":"104",
    "JK":"01912520982",
    "JH":"104",
    "KA":"104",
    "KL":"04712552056",
    "LD":"104",
    "MP":"104",
    "MH":"02026127394",
    "MN":"3852411668",
    "ML":"108",
    "MZ":"102",
    "NL":"7005539653",
    "OD":"9439994859",
    "PY":"104",
    "PB":"104",
    "RJ":"01412225624",
    "SK":"104",
    "TN":"0442951050",
    "TS":"104",
    "TR":"03812315879",
    "UP":"1800180514",
    "UK":"104",
    "WB":"1800313444222",
    "AN":"03192232102",
    "CH":"9779558282",
    "DD":"104",
    "LA":"01982256462",
    "OT":"+911123978046"
}

let graphqlEndpoint = "https://api.thegraph.com/subgraphs/name/anudit/saarthi";
