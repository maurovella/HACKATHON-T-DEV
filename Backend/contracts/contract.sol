// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";
import "github.com/provable-things/ethereum-api/provableAPI.sol";

struct deadLine {
    uint64 day;
    uint16 percetage;
}
contract myContract is ERC721URIStorage, Ownable { //este es el nombre del contrato
    using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;
   // Its mapping a token to the company
   mapping(uint256 => address) private _tokenToCompany;
   address payable private ownerAddress;
   uint32 private tokenPrize;
   uint32 private tokenQty;
   deadLine[] private deadLineList;
   uint16 private index;
   uint256 private balance;

   constructor(uint32 tokenPrize_, uint32 tokenQty_ ,deadLine[] memory deadLinesList_) ERC721("NFT", "ENFT") {
        // Lo que haga es obtener la address de quien creo el contrato para luego
        // poder mandarle los fondos que obtuvieron de las tranferencias.
        ownerAddress = payable(msg.sender);
        tokenPrize = tokenPrize_;
        tokenQty = tokenQty_;
        deadLineList = deadLinesList_;
        index = 0;
   }
    function totalSupply() public view returns(uint256){
        return _tokenIds.current();
    }
   function mintNFT(address recipient, string memory tokenURI) public payable returns (uint256){
        require(msg.balance == tokenPrize);
        balance += msg.balance;
       _tokenIds.increment();
       uint256 newItemId = _tokenIds.current();
       _mint(recipient, newItemId);
       _setTokenURI(newItemId, tokenURI);
       return newItemId;
   }
    //the owner can withdraw from the contract because payable was added to the state variable above
    function withdraw (uint _amount) public onlyOwner {
        require(msg.sender <= balance);
        require(deadLineList[index].day <= block.timestamp);
        if(index == deadLineList.length - 1)
            ownerAddress.transfer(balance);
            balance = 0;
        else{
            //TODO chequear tema decimales
            //transfer(ownerAddress, balance * deadlineList[index].percentage) * (10 ** 2))
            uint256 toTransfer = (deadLineList[index].percetage * balance) / 100;
            ownerAddress.transfer(toTransfer);
            balance -= toTransfer;
            index++;
        }

    }
}
