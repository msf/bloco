// @openzeppelin v4.6.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract NODE is ERC20PresetMinterPauser {

    constructor() public ERC20PresetMinterPauser("NODE, tugas l33t hax0rs grey hats", "NODE") {}

}
