// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IProject is IERC20 {

    constructor(string name_, string symbol_, uint32 premint, uint32 totalvalue_, uint32 totalpercentage_) ERC20(name_, symbol_);

    function calcTokens(uint32 value) public view returns (uint32);

    function canTransfer(uint32 value) public view returns (bool);

    function transferValue(address to, uint256 value) public onlyOwner;

}
