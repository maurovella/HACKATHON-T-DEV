//este contrato tiene que:
//-poder crear erc20, con una cantidad de tokens a mintear(factory de contrato con 10000000 tokens por 1000usd)
//-poder transferir esos tokens a un cliente con una funcion payable(este balance se tiene que guardar en los erc20 no?)
//-poder hacer withdraw de cada uno de los contratos
//-lockear el withdraw de los contratos hasta cierto timestamp
pragma solidity ^0.8.9;
import "./IProject.sol";

contract myMaster {

    struct ProjectData{
        address project;
        uint256 liquidity;
        uint256 duration;
        uint256 start;
        bool canClaim;
    }

    mapping(address => ProjectData) private mapProjectData; // Beneficiary -> ProjectData

    //creo que esta esta demas, para que sirve? seria address[] no?
    mapping(address => uint32[]) private mapBeneficiaryProjectList;

    function deployProject() public {

    }

    // function beneficiary(address beneficiaryAddress) public view virtual returns (address) {
    //     return mapContractData[contractAddress].beneficiary;
    // }

    function canClaim(address beneficiaryAddress) public view virtual returns (bool) {
        return mapProjectData[beneficiaryAddress].canClaim;
    }

    function claim(address beneficiaryAdress) public virtual{
        address contractAddress = mapProjectData[beneficiaryAdress].project;
        require(contractAddress != address(0));
        require(mapProjectData[beneficiaryAdress].canClaim );
      
        uint256 amount =(mapProjectData[beneficiaryAdress].liquidity * IProject(mapProjectData[beneficiaryAdress].project).balanceOf(msg.sender))/(IProject(mapProjectData[beneficiaryAdress].project).totalSupply());
        payable(msg.sender).transfer(amount );
    }

    // Recibir el address del ERC20 como parametro, que lo deployee otro
    function createProject(address beneficiaryAddress,
                            address ERC20Address,
                            uint64 duration,
                            uint64 start ) public{

        mapProjectData[beneficiaryAddress].project = ERC20Address;
        mapProjectData[beneficiaryAddress].liquidity = 0;
        mapProjectData[beneficiaryAddress].duration = duration;
        mapProjectData[beneficiaryAddress].start = start;
        mapProjectData[beneficiaryAddress].canClaim = false;
        //TODO check amount
    }

    function buyToken(address beneficiaryAddress) public payable{
        // hay que hacer require del msg.value? (probablemente si)
        require(IProject(mapProjectData[beneficiaryAddress].project).canTransfer(msg.value));

        IProject(mapProjectData[beneficiaryAddress].project).transferValue(msg.sender, msg.value);

        mapProjectData[beneficiaryAddress].liquidity += msg.value;
    }

    //esto no se si sirve o no
    // function release(IERC20 erc20, uint64 quantity) public virtual {
    //     uint256 amount = releasable(token);
    //     _erc20Released[tokenid] += amount;
    //     emit ERC20Released(token, amount);
    //     SafeERC20.safeTransfer(IERC20(token), beneficiary(), amount);
    // }

    function releaseEth( address payable beneficiaryAddress ) public {
        if ( block.timestamp  > mapProjectData[beneficiaryAddress].duration + mapProjectData[beneficiaryAddress].start){
            if(true){
                //TODO: chequeo de permisos
                beneficiaryAddress.transfer( mapProjectData[beneficiaryAddress].liquidity);
            }else {
                mapProjectData[beneficiaryAddress].canClaim = true;
            }
        }
    }


}
