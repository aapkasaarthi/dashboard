const contractABI=[
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_orgName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_fundName",
				"type": "string"
			},
			{
				"internalType": "address payable",
				"name": "_orgAdress",
				"type": "address"
			}
		],
		"name": "createFund",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_modelHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_rounds",
				"type": "uint256"
			}
		],
		"name": "createTask",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_fundID",
				"type": "uint256"
			}
		],
		"name": "donateToFund",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "taskID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_modelHash",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_time",
				"type": "uint256"
			}
		],
		"name": "modelUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "taskID",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_modelHash",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_amt",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_time",
				"type": "uint256"
			}
		],
		"name": "newTaskCreated",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_taskID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_modelHash",
				"type": "string"
			},
			{
				"internalType": "address payable",
				"name": "computer",
				"type": "address"
			}
		],
		"name": "updateModelForTask",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "updateOwner",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "fundCnt",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Funds",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "orgID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "orgName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "fundName",
				"type": "string"
			},
			{
				"internalType": "address payable",
				"name": "fundAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "donationAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "donationCnt",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTaskCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_taskID",
				"type": "uint256"
			}
		],
		"name": "getTaskHashes",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTasksOfUser",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "SentinelTasks",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "taskID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "currentRound",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalRounds",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "cost",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalDonationAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalDonationCnt",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "UserTaskIDs",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = "0x62C281318746C24d4C97660b8478bD8987B73550".toLowerCase();

const COORDINATOR_NODE = "https://saarthi-coor.herokuapp.com/";
const TESTER_NODE = "https://saarthi-tester.herokuapp.com/";
