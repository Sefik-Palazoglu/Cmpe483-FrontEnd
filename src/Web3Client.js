import Web3 from "web3";
// import MyGovContractBuild from './myGov.json'

let isInitialized = false;

let selectedAccount;

let myGovContract;

export const init = async () => {
	let provider = window.ethereum;

	if (typeof provider !== 'undefined') {
		// Metamask is installed.
		provider.request({ method: 'eth_requestAccounts' }).then(accounts => {
			selectedAccount = accounts[0];
			console.log(`SelectedAccount is: ${selectedAccount}`);
		}).catch(err => {
			console.log(err);
			return;
		})
	}

	window.ethereum.on('accountsChanged', function (accounts) {
		selectedAccount = accounts[0];
		console.log(`SelectedAccount changed to: ${selectedAccount}`);
	});

	const web3 = new Web3(provider);

	// const networkId = await web3.eth.net.getId();

	const MyGovContractBuildABI = [
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "tokenSupply",
					"type": "uint256"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "Approval",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "approve",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "subtractedValue",
					"type": "uint256"
				}
			],
			"name": "decreaseAllowance",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "memberaddr",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "projectid",
					"type": "uint256"
				}
			],
			"name": "delegateVoteTo",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "donateEther",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "donateMyGovToken",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "faucet",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "addedValue",
					"type": "uint256"
				}
			],
			"name": "increaseAllowance",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "projectid",
					"type": "uint256"
				}
			],
			"name": "reserveProjectGrant",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "ipfshash",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "votedeadline",
					"type": "uint256"
				},
				{
					"internalType": "uint256[]",
					"name": "paymentamounts",
					"type": "uint256[]"
				},
				{
					"internalType": "uint256[]",
					"name": "payschedule",
					"type": "uint256[]"
				}
			],
			"name": "submitProjectProposal",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "ipfshash",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "surveydeadline",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "numchoices",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "atmostchoice",
					"type": "uint256"
				}
			],
			"name": "submitSurvey",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "surveyid",
					"type": "uint256"
				}
			],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "surveyid",
					"type": "uint256"
				},
				{
					"internalType": "uint256[]",
					"name": "choices",
					"type": "uint256[]"
				}
			],
			"name": "takeSurvey",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "transfer",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "Transfer",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "transferFrom",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "projectid",
					"type": "uint256"
				},
				{
					"internalType": "bool",
					"name": "choice",
					"type": "bool"
				}
			],
			"name": "voteForProjectPayment",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "projectid",
					"type": "uint256"
				},
				{
					"internalType": "bool",
					"name": "choice",
					"type": "bool"
				}
			],
			"name": "voteForProjectProposal",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "projectid",
					"type": "uint256"
				}
			],
			"name": "withdrawProjectPayment",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				}
			],
			"name": "allowance",
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
			"name": "availableWei",
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
					"name": "account",
					"type": "address"
				}
			],
			"name": "balanceOf",
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
			"name": "decimals",
			"outputs": [
				{
					"internalType": "uint8",
					"name": "",
					"type": "uint8"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "projectid",
					"type": "uint256"
				}
			],
			"name": "getEtherReceivedByProject",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "amount",
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
					"name": "projectid",
					"type": "uint256"
				}
			],
			"name": "getIsProjectFunded",
			"outputs": [
				{
					"internalType": "bool",
					"name": "funded",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getNoOfFundedProjects",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "numfunded",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getNoOfProjectProposals",
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
			"name": "getNoOfSurveys",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "numsurveys",
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
					"name": "projectid",
					"type": "uint256"
				}
			],
			"name": "getProjectInfo",
			"outputs": [
				{
					"internalType": "string",
					"name": "ipfshash",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "votedeadline",
					"type": "uint256"
				},
				{
					"internalType": "uint256[]",
					"name": "paymentamounts",
					"type": "uint256[]"
				},
				{
					"internalType": "uint256[]",
					"name": "payschedule",
					"type": "uint256[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "projectid",
					"type": "uint256"
				}
			],
			"name": "getProjectNextPayment",
			"outputs": [
				{
					"internalType": "int256",
					"name": "next",
					"type": "int256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "projectid",
					"type": "uint256"
				}
			],
			"name": "getProjectOwner",
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
					"name": "surveyid",
					"type": "uint256"
				}
			],
			"name": "getSurveyInfo",
			"outputs": [
				{
					"internalType": "string",
					"name": "ipfshash",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "surveydeadline",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "numchoices",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "atmostchoice",
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
					"name": "surveyid",
					"type": "uint256"
				}
			],
			"name": "getSurveyOwner",
			"outputs": [
				{
					"internalType": "address",
					"name": "surveyowner",
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
					"name": "surveyid",
					"type": "uint256"
				}
			],
			"name": "getSurveyResults",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "numtaken",
					"type": "uint256"
				},
				{
					"internalType": "uint256[]",
					"name": "results",
					"type": "uint256[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "memberCount",
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
			"name": "name",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
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
			"name": "projectReceived",
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
					"name": "",
					"type": "uint256"
				}
			],
			"name": "projects",
			"outputs": [
				{
					"internalType": "string",
					"name": "_ipfshash",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "_voteDeadline",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "_owner",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_proposalVotes",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_stage",
					"type": "uint256"
				},
				{
					"internalType": "bool",
					"name": "_reserveCalled",
					"type": "bool"
				},
				{
					"internalType": "uint256",
					"name": "_withdrawnUntil",
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
			"name": "surveys",
			"outputs": [
				{
					"internalType": "string",
					"name": "_ipfshash",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "_surveyDeadline",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_numchoices",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_atmostchoice",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "_owner",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_numtaken",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "symbol",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "totalSupply",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	]

	myGovContract = new web3.eth.Contract(MyGovContractBuildABI, '0xA55cED6a21189Dc009beA6f0F6Bd49B5D9925a66');

	isInitialized = true;
};

export const balanceOf = async () => {
	if (!isInitialized) {
		await init();
	}
	console.log(`selected account in balanceOf: ${selectedAccount}`);
	return myGovContract.methods.balanceOf(selectedAccount).call();
}

export const faucet = async () => {
	if (!isInitialized) {
		await init();
	}
	console.log(`selected account in faucet: ${selectedAccount}`);
	return myGovContract.methods.faucet().send({from: selectedAccount});
}

export const donateEther = async (valueInWei) => {
	if (!isInitialized) {
		await init();
	}
	console.log(`selected account in donateEther: ${selectedAccount}`);
	return myGovContract.methods.donateEther().send({from: selectedAccount, value: valueInWei});
}

export const delegateVoteTo = async (address, projectId) => {
	if (!isInitialized) {
		await init();
	}
	console.log(`selected account in delegateVoteTo: ${selectedAccount}`);
	return myGovContract.methods.delegateVoteTo(address, projectId).send({from: selectedAccount});
}

export const donateMyGovToken = async (amount) => {
	if (!isInitialized) {
		await init();
	}
	console.log(`selected account in donateMyGovToken: ${selectedAccount}`);
	return myGovContract.methods.donateMyGovToken(amount).send({from: selectedAccount});
}

export const voteForProjectProposal = async (projectId, choice) => {
	if (!isInitialized) {
		await init();
	}
	console.log(`selected account in voteForProjectProposal: ${selectedAccount}`);
	return myGovContract.methods.voteForProjectProposal(projectId, choice).send({from: selectedAccount});
}

export const voteForProjectPayment = async (projectId, choice) => {
	if (!isInitialized) {
		await init();
	}
	console.log(`selected account in voteForProjectPayment: ${selectedAccount}`);
	return myGovContract.methods.voteForProjectPayment(projectId, choice).send({from: selectedAccount});
}

export const submitProjectProposal = async (ipfshash, votedeadline, paymentamounts, payschedule, valueInWei) => {
	if (!isInitialized) {
		await init();
	}
	console.log(`selected account in submitProjectProposal: ${selectedAccount}`);
	return myGovContract.methods.submitProjectProposal(ipfshash, votedeadline, paymentamounts, payschedule).send({from: selectedAccount, value: valueInWei});
}

export const submitSurvey = async (ipfshash, surveydeadline, numchoices, atmostchoice, valueInWei) => {
	if (!isInitialized) {
		await init();
	}
	console.log(`selected account in submitSurvey: ${selectedAccount}`);
	return myGovContract.methods.submitSurvey(ipfshash, surveydeadline, numchoices, atmostchoice).send({from: selectedAccount, value: valueInWei});
}

export const takeSurvey = async (surveyid, choices) => {
	if (!isInitialized) {
		await init();
	}
	console.log(`selected account in takeSurvey: ${selectedAccount}`);
	return myGovContract.methods.takeSurvey(surveyid, choices).send({from: selectedAccount});
}

export const reserveProjectGrant = async (projectid) => {
	if (!isInitialized) {
		await init();
	}
	console.log(`selected account in reserveProjectGrant: ${selectedAccount}`);
	return myGovContract.methods.reserveProjectGrant(projectid).send({from: selectedAccount});
}

export const withdrawProjectPayment = async (projectid) => {
	if (!isInitialized) {
		await init();
	}
	console.log(`selected account in withdrawProjectPayment: ${selectedAccount}`);
	return myGovContract.methods.withdrawProjectPayment(projectid).send({from: selectedAccount});
}

// TODO: metamask connection error?
export const getSurveyResults = async (surveyid) => {
	if (!isInitialized) {
		await init();
	}
	console.log(`selected account in getSurveyResults: ${selectedAccount}`);
	return myGovContract.methods.getSurveyResults(surveyid).call(2);
}

// TODO: metamask connection error?
export const getSurveyInfo = async (surveyid) => {
	if (!isInitialized) {
		await init();
	}
	console.log(`selected account in getSurveyInfo: ${selectedAccount}`);
	return myGovContract.methods.getSurveyInfo(surveyid).call(4);
}

// TODO: metamask connection error?
export const getSurveyOwner = async (surveyid) => {
	if (!isInitialized) {
		await init();
	}
	console.log(`selected account in getSurveyOwner: ${selectedAccount}`);
	return myGovContract.methods.getSurveyOwner(surveyid).call(1);
}

export const getIsProjectFunded = async (projectid) => {
	if (!isInitialized) {
		await init();
	}
	console.log(`selected account in getIsProjectFunded: ${selectedAccount}`);
	return myGovContract.methods.getIsProjectFunded(projectid).call(1);
}


export const getProjectNextPayment = async (projectid) => {
	if (!isInitialized) {
		await init();
	}
	console.log(`selected account in getProjectNextPayment: ${selectedAccount}`);
	return myGovContract.methods.getProjectNextPayment(projectid).call(1);
}

export const getProjectOwner = async (projectid) => {
	if (!isInitialized) {
		await init();
	}
	console.log(`selected account in getProjectOwner: ${selectedAccount}`);
	return myGovContract.methods.getProjectOwner(projectid).call(1);
}

export const getProjectInfo = async (projectid) => {
	if (!isInitialized) {
		await init();
	}
	console.log(`selected account in getProjectInfo: ${selectedAccount}`);
	return myGovContract.methods.getProjectInfo(projectid).call(4);
}

// making call() instead of call(0) worked, why?
export const getNoOfProjectProposals = async () => {
	if (!isInitialized) {
		await init();
	}
	console.log(`selected account in getNoOfProjectProposals: ${selectedAccount}`);
	return myGovContract.methods.getNoOfProjectProposals().call();
}

export const getNoOfFundedProjects = async () => {
	if (!isInitialized) {
		await init();
	}
	console.log(`selected account in getNoOfFundedProjects: ${selectedAccount}`);
	return myGovContract.methods.getNoOfFundedProjects().call();
}