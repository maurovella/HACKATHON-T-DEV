// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";


contract myContract is ERC721URIStorage, Ownable { //este es el nombre del contrato
    using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;
   mapping( address  => uint256 ) private amountCash;
   // Its mapping a token to the company
   mapping(uint256 => address) private _tokenToCompany;
   address payable private ownerAddress;
   uint32 private tokenPrize;
   uint32 private tokenQty;

   constructor(uint32 tokenPrize_, uint32 tokenQty_ ) ERC721("NFT", "ENFT") {
        // Lo que haga es obtener la address de quien creo el contrato para luego
        // poder mandarle los fondos que obtuvieron de las tranferencias.
        ownerAddress = payable(msg.sender);
        tokenPrize = tokenPrize_;
        tokenQty = tokenQty_;
   }
    function totalSupply() public view returns(uint256){
        return _tokenIds.current();
    }
   function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256){
       _tokenIds.increment();
       uint256 newItemId = _tokenIds.current();
      // _tokenToCompany[newItemId] = client;
       _mint(recipient, newItemId);
       _setTokenURI(newItemId, tokenURI);
       return newItemId;
   }
    //the owner can withdraw from the contract because payable was added to the state variable above
    function withdraw (uint _amount) public onlyOwner {
        ownerAddress.transfer(_amount);
    }
    //to.transfer works because we made the address above payable.
    function transferAll() public payable  {

        payable(msg.sender).transfer(amountCash[msg.sender]);
    }
    function addCompany(address payable client) public onlyOwner{
        amountCash[client] = 0;
    }

    function transferFromPayable(
        address from,
        address to,
        uint256 tokenId
    ) public   payable{
        // Digo cuando tienen que pagar para transferirla
        require(msg.value > 3 ether);

        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner nor approved");
        amountCash[_tokenToCompany[tokenId]] += msg.value;
        _transfer(from, to, tokenId);
    }

}
