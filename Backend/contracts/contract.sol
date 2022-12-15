// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";
import "github.com/provable-things/ethereum-api/provableAPI.sol";

contract myContract is
    ERC721URIStorage,
    Ownable,
    usingProvable 
{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    mapping(address => uint256) private amountCash;
    // Its mapping a token to the company
    mapping(uint256 => address) private _tokenToCompany;
    uint64 hasComplied;
    address payable private ownerAddress;

    event LogObjectiveQuery(string description);

    constructor() ERC721("NFT", "ENFT") {
        // Lo que haga es obtener la address de quien creo el contrato para luego
        // poder mandarle los fondos que obtuvieron de las tranferencias.
        ownerAddress = payable(msg.sender);
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    function mintNFT(address recipient, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        // _tokenToCompany[newItemId] = client;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    //the owner can withdraw from the contract because payable was added to the state variable above
    function withdraw(uint256 _amount) public onlyOwner {
        ownerAddress.transfer(_amount);
    }

    //to.transfer works because we made the address above payable.
    function transferAll() public payable {
        payable(msg.sender).transfer(amountCash[msg.sender]);
    }

    function addCompany(address payable client) public onlyOwner {
        amountCash[client] = 0;
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
