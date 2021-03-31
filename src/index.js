import Web3 from "web3";
import messageArtifact from "../build/contracts/Message.json";
     
const App = {
	web3: null,
	account: null,
	meta: null,
  
	start: async function() {
	  const { web3 } = this;
  
	  try {
		// get contract instance
		const networkId = await web3.eth.net.getId();
		
		const deployedNetwork = messageArtifact.networks[networkId];
		this.meta = new web3.eth.Contract(
			messageArtifact.abi,
		  deployedNetwork.address,
		);
  
		// get accounts
		const accounts = await web3.eth.getAccounts();
		this.account = accounts[0];
	  } catch (error) {
		console.error("Could not connect to contract or chain.");
		console.log(error)
	  }
	},
  
	setStatus: function(message) {
	  const status = document.getElementById("status");
	  status.innerHTML = message;
	},
  
  
	setMessage: async function() {
		const { setMessage } = this.meta.methods;
		const message = document.getElementById("userInput").value;
		console.log(document.getElementById("userInput").value)
		await setMessage(message).send({from: this.account});
	  	App.setStatus(`New status is ${message}`);
	}, 

  };
  
  window.App = App;
  
  window.addEventListener("load", async function() {
	if (window.ethereum) {
	  // use MetaMask's provider
	  App.web3 = new Web3(window.ethereum);
	  await window.ethereum.enable(); // get permission to access accounts
	} else {
	  console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",);
	  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
	  App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"),);
	}
  
	App.start();
  });