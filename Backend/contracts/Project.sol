// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IProject.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ProjectToken is ERC20, IProject, Ownable {
   
    uint256 private equityValue;
    uint8 private equity;
    address private beneficiary;
    bool public hasComplied;

    constructor(address _beneficiary, address _mainContract, string memory _name, string memory _symbol, uint32 _premint, uint256 _equityValue, uint8 _equity) ERC20(_name, _symbol) {
        require(_equity > 0 && _equity < 100, "Percentage not valid 100<%<0");
        _mint(_mainContract, _premint * 10 ** decimals());
        equityValue = _equityValue;
        beneficiary = _beneficiary;
        equity = _equity;
        transferOwnership(_mainContract);
    }

    function calcTokens(uint256 _equityValue) public view returns (uint256){
        return (_equityValue * totalSupply())/ equityValue;
    }


    function transferValue(address to, uint256 value) public {
        transfer(to,calcTokens(value));
    }

    function getBeneficiary() public view returns (address){
        return beneficiary;
    }

    function getEquityValue() public view returns(uint256){
        return equityValue;
    }

    function burnFrom(address account, uint256 amount) public onlyOwner {
        _burn(account, amount);
    }

}

