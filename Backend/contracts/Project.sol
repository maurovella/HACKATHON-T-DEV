// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IProject.sol";

contract ProjectToken is ERC20, IProject, Ownable {

    uint32 private equityValue;
    uint8 private equity;
    address private beneficiary;
    constructor(address _beneficiary, string memory _name, string memory _symbol, uint32 _premint, uint32 _equityValue, uint8 _equity) ERC20(_name, _symbol) {
        require(_equity > 0 && _equity < 100, "Percentage not valid 100<%<0");
        _mint(msg.sender, _premint * 10 ** decimals());
        equityValue = _equityValue;
        beneficiary = _beneficiary;
        equity = _equity;
    }

    function calcTokens(uint256 _equityValue) public view returns (uint256){
        return _equityValue / this.totalSupply();
    }

    function canTransfer(uint256 value) public view returns (bool){
        return calcTokens(value)<=this.totalSupply();
    }

    function transferValue(address to, uint256 value) public onlyOwner{
        require (canTransfer(value));
        this.transfer(to,calcTokens(value));

    }


    function getBeneficiary() public view returns (address){
        return beneficiary;
    }

}
