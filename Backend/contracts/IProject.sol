// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IProject is IERC20 {

    function calcTokens(uint256 value) external view  returns (uint256);

    function canTransfer(uint256 value) external view returns (bool);

    function transferValue(address to, uint256 value) external ;

}
