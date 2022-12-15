import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./contract.sol";

contract ContractFactory {

    event ContractDeployed(address indexed creator, address indexed NFTAddress);

    function createContract(string memory name,uint32 tokenPrize_, uint32 tokenQty_ ,deadLine[] memory deadLinesList_) public  {
        myContract contractDeployed = new myContract(tokenPrize_, tokenQty_, deadLinesList_);
        emit ContractDeployed(msg.sender, address(contractDeployed));
        
    }   
}