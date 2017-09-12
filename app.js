var data = "";
var host = "http://159.203.0.218:8545";

var Web3 = require('web3');
var web3 = new Web3();
var balance = new BigNumber('131242344353464564564574574567456');

function init() 
{
	if (typeof web3 !== 'undefined') {
	  web3 = new Web3(new Web3.providers.HttpProvider(host));
	  console.log('new');
	} else {
	  console.log('setting provider');
	  // set the provider you want from Web3.providers
	  web3 = new Web3(new Web3.providers.HttpProvider(host));
	}

	if(!web3.isConnected()) {
	   // show some dialog to ask the user to start a node
	   console.log('no esta conectado')
	} else {
	   console.log('conectado!!')
	   charge_data()
	}
}



// Account functios
$("#get_balance").click(function(){
	var address = $("#account_balance").val();
	if(address != "") {
	console.log(address)
	$("#balance").text("Eth: " + web3.eth.getBalance(address));
	$("#account_balance").val("");
	} else {
		alert("No account provided")
	}
});

$("#get_code").click(function(){
	var address = $("#account_code").val();
	if(address != "") {
		console.log(address)
		$("#code").text("Code: " + web3.eth.getCode(address));
		$("#account_code").val("");
	} else {
		alert("No account provided")
	}
});

$("#get_trans").click(function(){
	var trans = $("#account_trans").val();
	if(trans != "") {
		console.log(trans)
		var output = web3.eth.getTransaction(trans);
		if (output != null) {
			$("#trans").text("Transaction:  check console (F12)");
			console.log("Transaction:");
			console.log(output);
		} else {
			$("#trans").text("Invalid");
		}
		$("#account_trans").val("");
	} else {
		alert("No transaction provided")
	}
});

$("#change_host").click(function(){
	host = $("#host_url").val();
	$('#host').text('Host: ' + host)
	console.log(host);
	init();
});

/////////////////////////////////////

function charge_data() {
	data = "";
	data += "<strong>Estado: </strong> conectado <br/>" 
   // start web3 filters, calls, etc
   $('#host').text('Host: ' + web3.currentProvider.host)

	data += "<strong>Network: </strong> "+web3.version.network+" <br/>";
	data += "<strong>Ethereum version: </strong> "+web3.version.ethereum+" <br/>";
	data += "<strong>Is listenig: </strong> "+web3.net.listening+" <br/>";
	data += "<strong>Connectes peers: </strong> "+web3.net.peerCount+" <br/>";
	data += "<strong>Ethereum methods: </strong> (check console) F12 <br/>";
	data += "<strong>Ethereum default account: </strong> "+web3.eth.defaultAccount+" <br/>"
	data += "<strong>Ethereum default block: </strong> "+web3.eth.defaultBlock+" <br/>";
	data += "<strong>Ethereum sync: </strong> "+web3.eth.syncing+" <br/>";
	data += "<strong>Ethereum coinbase: </strong> "+web3.eth.coinbase+" <br/>";
	data += "<strong>Ethereum is mining: </strong> "+web3.eth.mining+" <br/>";
	data += "<strong>Ethereum gas price: </strong> "+web3.eth.gasPrice+" <br/>";

	data += "<strong>Ethereum accounts: </strong>  <br/>";
	web3.eth.accounts.forEach(function(item){
		data += " "+ item + "<br/>"
	})
	data += "<strong>Ethereum get current block: </strong> (check console) F12<br/>";

	console.log("Current block")
	console.log(web3.eth.getBlock(web3.eth.blockNumber))

	console.log("Ethereum methods")
	console.log((web3.eth))

	$('#data').html(data)
}

init();