// splits profits between A and B shareholders

contract Dividend {
  address shareHolderA;
  address shareHolderB;

  function Dividend(address A, address B){
    shareHolderA = A;
    shareHolderB = B;
  }

  function pay(uint amount) returns (bool success){
    if(!shareHolderA.send(amount / 2)) throw;
    if(!shareHolderB.send(amount / 2)) throw;
    return true;
  }

  function () {
    throw;
  }
}
