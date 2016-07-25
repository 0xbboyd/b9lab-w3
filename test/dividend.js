contract('Dividend', function(accounts) {
  it("should assert true", function(done) {
    var dividend = Dividend.at(Dividend.deployed_address);
    assert.isTrue(true);
    done();
  });
});
