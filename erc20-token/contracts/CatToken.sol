pragma solidity ^0.7.4;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract CatToken is ERC20 {

    constructor(string memory _name, string memory _symbol, uint _initialSupply) 
    ERC20(_name, _symbol) public {
        require(_initialSupply > 0, "INITIAL_SUPPLY has to be greater than 0");
        _mint(msg.sender, _initialSupply);
    }
}

