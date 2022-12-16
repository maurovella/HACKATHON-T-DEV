// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IProject.sol";

contract ProjectToken is ERC20, IProject, Ownable {

    uint32 public equityValue;
    uint8 public equity;
    address public beneficiary;
    constructor(address _beneficiary, string _name, string _symbol, uint32 _premint, uint32 _equityValue, uint8 _equity) ERC20(name_, symbol_) {
        require(_equity > 0 && _equity < 100, "Percentage not valid 100<%<0");
        _mint(msg.sender, _premint * 10 ** decimals());
        equityValue = _equityValue;
        equity = _equity;
    }

    function calcTokens(uint32 _equityValue) public view returns (uint){
        return value / this.totalSupply();
    }

    function canTransfer(uint32 value) public view returns (bool){
        return calcTokens(value)<=this.totalSupply();
    }

    function transferValue(address to, uint256 value) public onlyOwner{
        require canTransfer(value);
        this.transfer(to,calcTokens(value));

    }


    function getBeneficiary() public view returns address{
        return beneficiary;
    }

}

