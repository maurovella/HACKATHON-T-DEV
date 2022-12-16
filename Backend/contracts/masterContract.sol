//este contrato tiene que:
//-poder crear erc20, con una cantidad de tokens a mintear(factory de contrato con 10000000 tokens por 1000usd)
//-poder transferir esos tokens a un cliente con una funcion payable(este balance se tiene que guardar en los erc20 no?)
//-poder hacer withdraw de cada uno de los contratos
//-lockear el withdraw de los contratos hasta cierto timestamp
pragma solidity ^0.8.9;
import "./IProject.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract myMaster {

    struct ProjectData{
        address project;
        uint256 balance;
        uint256 duration;
        uint256 start;
        bool canClaim;
    }

    mapping(address => ProjectData) private mapProjectData; // Beneficiary -> ProjectData

    function canClaim(address beneficiaryAddress) public view virtual returns (bool) {
        return mapProjectData[beneficiaryAddress].canClaim;
    }

    function claim(address beneficiaryAdress) public virtual{
        address contractAddress = mapProjectData[beneficiaryAdress].project;
        require(contractAddress != address(0));
        require(mapProjectData[beneficiaryAdress].canClaim );

        uint256 amount = (mapProjectData[beneficiaryAdress].balance * IProject(mapProjectData[beneficiaryAdress].project).balanceOf(msg.sender))/(IProject(mapProjectData[beneficiaryAdress].project).totalSupply());
        Address.sendValue(payable(msg.sender), amount);
    }

    // Recibir el address del ERC20 como parametro, que lo deployee otro
    function createProject(address beneficiaryAddress,
                            address ERC20Address,
                            uint256 duration) public {

        mapProjectData[beneficiaryAddress].project = ERC20Address;
        mapProjectData[beneficiaryAddress].balance = 0;
        mapProjectData[beneficiaryAddress].duration = duration;
        mapProjectData[beneficiaryAddress].start = block.timestamp;
        mapProjectData[beneficiaryAddress].canClaim = false;

        //TODO check amount
    }
    function getProject(address beneficiaryAddress) public view returns( ProjectData memory){
        return mapProjectData[beneficiaryAddress];
    }

    function buyToken(address beneficiaryAddress) public payable{
        
        require( beneficiaryAddress != address(0),"1" );
        require( mapProjectData[beneficiaryAddress].project != address(0),"2" );
        require(msg.value > 0);

        IProject(mapProjectData[beneficiaryAddress].project).transferValue(msg.sender, msg.value);

        mapProjectData[beneficiaryAddress].balance += msg.value;
    }
    function getBalance(address beneficiaryAddress) public view returns(uint256){
        return IProject(mapProjectData[beneficiaryAddress].project).balanceOf(address(this));
    }

    // TODO podria ser mas facil si releaseEth recibe el address del proyecto solamente
    // y se fija si msg.sender es el beneficiary
    function releaseEth( address payable beneficiaryAddress ) public {
        require( beneficiaryAddress != address(0) );
        require( mapProjectData[beneficiaryAddress].project != address(0) );
        // if (canClaim(beneficiaryAddress)) -> send seria mas simple el codigo (y hacer la funcion canClaim internal)
        if ( block.timestamp > mapProjectData[beneficiaryAddress].duration + mapProjectData[beneficiaryAddress].start){
            //aca va el oraculo
            if(oracle()){
                //TODO: chequeo de permisos
                Address.sendValue(payable(beneficiaryAddress), mapProjectData[beneficiaryAddress].balance);
            }else {
                mapProjectData[beneficiaryAddress].canClaim = true;
            }
        }
    }

    function oracle() public view returns (bool){
        return true;
    }
}
