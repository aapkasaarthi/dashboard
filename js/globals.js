const contractABI = [
	{
	  "inputs": [],
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
	  "inputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "name": "Campaigns",
	  "outputs": [
		{
		  "internalType": "address",
		  "name": "",
		  "type": "address"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
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
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "name": "Reports",
	  "outputs": [
		{
		  "internalType": "address",
		  "name": "userAddress",
		  "type": "address"
		},
		{
		  "internalType": "string",
		  "name": "userName",
		  "type": "string"
		},
		{
		  "internalType": "string",
		  "name": "location",
		  "type": "string"
		},
		{
		  "internalType": "string",
		  "name": "file",
		  "type": "string"
		},
		{
		  "internalType": "string",
		  "name": "details",
		  "type": "string"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "name": "SaarthiTasks",
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
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "UserCnt",
	  "outputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
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
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "",
		  "type": "address"
		}
	  ],
	  "name": "Users",
	  "outputs": [
		{
		  "internalType": "address payable",
		  "name": "userAddress",
		  "type": "address"
		},
		{
		  "internalType": "uint256",
		  "name": "recordHistoryCnt",
		  "type": "uint256"
		},
		{
		  "internalType": "uint256",
		  "name": "billAmount",
		  "type": "uint256"
		},
		{
		  "internalType": "uint256",
		  "name": "donationCnt",
		  "type": "uint256"
		},
		{
		  "internalType": "bool",
		  "name": "hasCampaign",
		  "type": "bool"
		},
		{
		  "internalType": "string",
		  "name": "campaignData",
		  "type": "string"
		},
		{
		  "internalType": "bool",
		  "name": "hasAllowedResearch",
		  "type": "bool"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "string",
		  "name": "_recordHash",
		  "type": "string"
		}
	  ],
	  "name": "addRecord",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "addUser",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "allowAccessToResearch",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "_address",
		  "type": "address"
		}
	  ],
	  "name": "allowAccessToUser",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "uint256",
		  "name": "_amt",
		  "type": "uint256"
		}
	  ],
	  "name": "billUser",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "campaignCnt",
	  "outputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "string",
		  "name": "_campaignData",
		  "type": "string"
		}
	  ],
	  "name": "createCampaign",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
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
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
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
	  "stateMutability": "payable",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "uint256",
		  "name": "_fundID",
		  "type": "uint256"
		}
	  ],
	  "name": "donateToFund",
	  "outputs": [],
	  "stateMutability": "payable",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "_user",
		  "type": "address"
		}
	  ],
	  "name": "donateToUser",
	  "outputs": [],
	  "stateMutability": "payable",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "string",
		  "name": "_userName",
		  "type": "string"
		},
		{
		  "internalType": "string",
		  "name": "_location",
		  "type": "string"
		},
		{
		  "internalType": "string",
		  "name": "_file",
		  "type": "string"
		},
		{
		  "internalType": "string",
		  "name": "_details",
		  "type": "string"
		}
	  ],
	  "name": "fileReport",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "fundCnt",
	  "outputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "getAccessors",
	  "outputs": [
		{
		  "internalType": "address[]",
		  "name": "",
		  "type": "address[]"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "_user",
		  "type": "address"
		}
	  ],
	  "name": "getDonationAddresses",
	  "outputs": [
		{
		  "internalType": "address[]",
		  "name": "donationAddresses",
		  "type": "address[]"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "_user",
		  "type": "address"
		}
	  ],
	  "name": "getDonationAmounts",
	  "outputs": [
		{
		  "internalType": "uint256[]",
		  "name": "donationAmounts",
		  "type": "uint256[]"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "_user",
		  "type": "address"
		},
		{
		  "internalType": "uint256",
		  "name": "_index",
		  "type": "uint256"
		}
	  ],
	  "name": "getRecord",
	  "outputs": [
		{
		  "internalType": "string",
		  "name": "records",
		  "type": "string"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "getTaskCount",
	  "outputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "getTasksOfUser",
	  "outputs": [
		{
		  "internalType": "uint256[]",
		  "name": "",
		  "type": "uint256[]"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "reportCnt",
	  "outputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "revokeAccessToResearch",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "stopCampaign",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "totalDonationAmount",
	  "outputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "totalDonationCnt",
	  "outputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
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
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "_newOwner",
		  "type": "address"
		}
	  ],
	  "name": "updateOwner",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	}
  ];
const contractAddress = "0x71f66599ee700b14de3f00ef6620cba70964a1d3".toLowerCase();

const COORDINATOR_NODE = "https://saarthi-coor.herokuapp.com/";
const TESTER_NODE = "https://covidsymptomtester.herokuapp.com/";
