contract('Dividend', function(accounts) {
  it('should not have a starting balance', function(){
    var balance = web3.eth.getBalance(Dividend.deployed().address);
    assert.equal(balance, 0);
  });
  it("should pay half the received amount to shareHolderA and shareHolderB", function() {
    var shareHolderA = accounts[0];
    var shareHolderB = accounts[1];
    var thirdParty = accounts[2];

    Dividend.new(shareHolderA, shareHolderB).then(function(instance){
      // console.log(instance.address);
      // console.log(instance);
      var account_one_starting_balance = web3.eth.getBalance(shareHolderA);
      var account_two_starting_balance = web3.eth.getBalance(shareHolderB);
      var third_party_starting_balance = web3.eth.getBalance(thirdParty);

      var amount = 10;

      instance.pay(amount, {from: thirdParty}).then(function(success){
        var account_one_ending_balance = web3.eth.getBalance(shareHolderA);
        var account_two_ending_balance = web3.eth.getBalance(shareHolderB);
        var third_party_ending_balance = web3.eth.getBalance(thirdParty);

        assert.equal(third_party_ending_balance, third_party_starting_balance - amount, "Amount wasn't correctly taken from the sender");
        assert.equal(account_one_ending_balance, account_one_starting_balance + amount / 2, "Amount wasn't correctly sent to shareHolderA");
        assert.equal(account_two_ending_balance, account_two_starting_balance + amount / 2, "Amount wasn't correctly sent to shareHolderB");
      });
    }).catch(function(e){
      throw(e);
    });
  });
});
