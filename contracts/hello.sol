pragma solidity ^0.7.6;

contract Hello {

    string name;

    /* This runs when the contract is executed */
    constructor() {
        name = "seu l33t hax0r";
    }

    function hello() public view returns (string memory, string memory) {
        return (unicode"Olé", name);
    }

    function setName(string memory _name) public {
        name = _name;
    }
}
