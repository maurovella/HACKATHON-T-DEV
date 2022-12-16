// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";
import "github.com/provable-things/ethereum-api/provableAPI.sol";

struct Objective {
    uint64 day;
    uint8 percentage;
    bool achieved;
}
contract myContract is ERC721URIStorage, Ownable, usingProvable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Its mapping a token to the company
    address payable public ownerAddress;
    uint32 public tokenPrice;  // add setter owneronly
    uint32 private mintedPublic;
    uint32 private mintedReserved; // add getter with authentication
    uint32 private mintedTokens; // add getter

    uint32 public MAX_SUPPLY; // add setter with auth
    uint32 public RESERVED_SUPPLY; // add setter with auth

    Objective[] private objectiveList;
    uint256 private balance;

    uint16 index;
    event LogObjectiveQuery(string description);
    uint64 hasComplied;

   constructor(uint32 tokenPrice_, uint32 tokenQty_ , Objective[] memory objectiveList_) ERC721("NFT", "ENFT") {
        // Lo que haga es obtener la address de quien creo el contrato para luego
        // poder mandarle los fondos que obtuvieron de las tranferencias.
        hasComplied = 0;
        tokenPrice = tokenPrice_;
        mintedPublic = tokenQty_;
        objectiveList = objectiveList_;
        ownerAddress = address(msg.sender);
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    function mintNFT(address recipient, string memory tokenURI) public payable returns (uint256){
        require(msg.value == tokenPrice);
        balance += msg.value;
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
    //the owner can withdraw from the contract because payable was added to the state variable above
    function withdraw (uint _amount) public onlyOwner {
        require(msg.balance <= balance);
        require(objectiveList[index].day <= block.timestamp);
        if(index == objectiveList.length - 1) {
            ownerAddress.transfer(balance);
            balance = 0;
        }
        else {
            //TODO chequear tema decimales
            //transfer(ownerAddress, balance * deadlineList[index].percentage) * (10 ** 2))
            uint256 toTransfer = (objectiveList[index].percentage * balance) / 100;
            ownerAddress.transfer(toTransfer);
            balance -= toTransfer;
            index++;
        }
    }

    function transferFromPayable(
        address from,
        address to,
        uint256 tokenId
    ) public payable {
        // Digo cuando tienen que pagar para transferirla
        require(msg.value > 3 ether);

        //solhint-disable-next-line max-line-length
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: caller is not token owner nor approved"
        );
        amountCash[_tokenToCompany[tokenId]] += msg.value;
        _transfer(from, to, tokenId);
    }

    function updateObjective() public payable {
        emit LogObjectiveQuery("waiting for the objective query answer...");
        provable_query("WolframAlpha", "random number between 1 and 0");
    }

    function __callback(
        bytes32 _myid,
        string memory _result
    )
        public
    {
        require(msg.sender == provable_cbAddress()); //aca se fija si el query es autentico
        // emit LogNewDieselPrice(_result); aca podriamos emitir un evento
        hasComplied = parseInt(_result, 1); // el result es lo que obtuvo del query
        // Now do something with the USD Diesel price...
    }

}
