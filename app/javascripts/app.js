var accounts;
var account;
var balance;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refreshBalance() {
  try {
    var balance_element = document.getElementById("balance");
    balance_element.innerHTML = web3.eth.getBalance(Dividend.deployed().address);
    var elementA = document.getElementById("balanceA");
    elementA.innerHTML = web3.eth.getBalance(web3.eth.accounts[0]);
    var elementB = document.getElementById("balanceB");
    elementB.innerHTML = web3.eth.getBalance(web3.eth.accounts[1]);
  } catch(e){
    console.log(e);
  }
};

function sendCoin() {
  var meta = MetaCoin.deployed();

  var amount = parseInt(document.getElementById("amount").value);
  var receiver = document.getElementById("receiver").value;

  setStatus("Initiating transaction... (please wait)");

  meta.sendCoin(receiver, amount, {from: account}).then(function() {
    setStatus("Transaction complete!");
    refreshBalance();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending coin; see log.");
  });
};

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    refreshBalance();
  });
}
