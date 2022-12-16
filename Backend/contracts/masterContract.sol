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
        uint64 amount;
        uint64 duration;
        uint64 start;
        bool canClaim;
    }

    mapping(address => ProjectData) private mapProjectData; // Beneficiary -> ProjectData

    mapping(address => address) private mapPayeeWithBeneficiary; // Payee -> Beneficiary
    mapping(address => uint64) private mapPayeeWithAmount; // Payee -> Amount

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

    function claim() public virtual{
        address contractAddress = mapProjectData[msg.sender].project;
        require(contractAddress != address(0));
        require(mapProjectData[msg.sender].canClaim );
        uint64 amount = mapPayeeWithAmount[msg.sender];

        delete mapPayeeWithAmount[msg.sender];
        
        payable(msg.sender).transfer( amount);
    }

    // Recibir el address del ERC20 como parametro, que lo deployee otro
    function addBeneficiary(address beneficiaryAddress, address ERC20Address ) public returns (address){

        mapProjectData[beneficiaryAddress].project = ERC20Address;
        //TODO check amount


    }

    function buyToken(address beneficiaryAddress) public payable{
        // hay que hacer require del msg.value? (probablemente si)
        require(IProject(mapProjectData[beneficiaryAddress].project).canTransfer(msg.value));

        IProject(mapProjectData[beneficiaryAddress].project).transferValue(msg.sender, msg.value);

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
                beneficiaryAddress.transfer( mapProjectData[beneficiaryAddress].amount);
            }else {
                mapProjectData[beneficiaryAddress].canClaim = true;
            }
        }
    }


}
