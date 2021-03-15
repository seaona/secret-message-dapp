
     var script = document.createElement('script');
	 script.src = 'https://code.jquery.com/jquery-3.2.1.slim.min.js';
	 script.type = 'text/javascript';
	 document.getElementsByTagName('head')[0].appendChild(script);

	   // Connect a the web3 provider
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
            console.log("Connected provider")
        }

        // Set a default account
        web3.eth.defaultAccount = web3.eth.accounts[0];

        // Get the contract info 
        const contractAddress = '0x645dF611C0F061003b0659257d7862766C90BFD1';
       	const abi = [
			{
				"inputs": [
					{
						"internalType": "string",
						"name": "x",
						"type": "string"
					}
				],
				"name": "setMessage",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "getMessage",
				"outputs": [
					{
						"internalType": "string",
						"name": "",
						"type": "string"
					}
				],
				"stateMutability": "view",
				"type": "function"
			}
		]
            
    	let myMessage = new web3.eth.Contract(abi, contractAddress)


	 	console.log(`contract ${myMessage}`);


        $("#setMessageButton").click(function () {
            myMessage.setMessage($("#userInput").val());
            console.log($("#userInput").val())
        });