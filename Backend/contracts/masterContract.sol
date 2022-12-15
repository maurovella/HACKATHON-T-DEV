//este contrato tiene que:
//-poder crear erc20, con una cantidad de tokens a mintear(factory de contrato con 10000000 tokens por 1000usd)
//-poder transferir esos tokens a un cliente con una funcion payable(este balance se tiene que guardar en los erc20 no?)
//-poder hacer withdraw de cada uno de los contratos
//-lockear el withdraw de los contratos hasta cierto timestamp

contract myMaster {//TODO: cambiar todos los mappings sacar projectId
    mapping(address => address) private mapPayeeWithContract; // Payee -> Contract
    mapping(address => uint64) private mapPayeeWithAmount; // Payee -> Amount
    mapping(address => bool) private mapContractWithCanClaim ; // can claim

    mapping(address => uint64) private mapProjectIdxToAmount; // ProjectID -> Amount
    mapping(uint32 => uint64) private mapProjectIdxToDuration; // ProjectID -> Duration
    mapping(uint32 => uint64) private mapProjectIdxToStart //  ProjectID -> Start

    mapping(uint32 => address) private mapProjectIdxToAddress; // ProjectID -> ProjectAddress
    mapping(uint32 => address) private mapProjectIdxToBeneficiary; // ProjectID -> OwnerAddress    //mapping(address => uint32[]) private mapBeneficiaryToPreject; // OwnerAddress -> ProjectID
    mapping(address => uint32[]) private mapBeneficiaryProjectList;

    function deployProject() public {

    }

    function beneficiary(uint32 projectIdx_) public view virtual returns (address) {
        return mapProjectIdxToAddress[projectIdx_];
    }

    function canClaim(address contractAddress) public view virtual returns (uint256) {
        return mapContractWithCanClaim[contractAddress];
    }

    function claim() public virtual{
        address contractAddress = mapPayeeWithContract[msg.sender];
        require(contractAddress != address(0));
        require(canClaim(contractAddress));
        uint64 amount = mapPayeeWithAmount[msg.sender];

        delete mapPayeeWithContract[msg.sender];
        delete mapPayeeWithAmount[msg.sender];
        Address.sendValue(payable(msg.sender), amount);
    }

    // Recibir el address del ERC20 como parametro, que lo deployee otro
    function addBeneficiary(IERC20 address) public returns (address){
        mapProjectIdxToAddress[address] = New erc20();// hay un quilombo con los mappings
        mapProjectIdxToBeneficiary = ERC20(address).getBeneficiary();
        //TODO check amount


    }

    function buyToken(uint16 adressWallet) payable{
        //require(msg.value > 4 eth);
        //necesito calcular el 4% , cuanto representa cada token de la empresa
        require(ERC20(mapProjectIdxToAddress[adressWallet]).canTransfer(msg.value);)
        //Aca debo sumar la plata que tiene la empresa

        ERC20(mapProjectIdxToAddress[adressWallet]).transferValue(addressWallet, msg.value);

    }


    function release(IERC20 erc20, uint64 quantity) public virtual {
        uint256 amount = releasable(token);
        _erc20Released[tokenid] += amount;
        emit ERC20Released(token, amount);
        SafeERC20.safeTransfer(IERC20(token), beneficiary(), amount);
    }

    function releaseEth(uint32 projectIdx_) public {
        if ( block.now  > mapProjectIdxToDuration[projectIdx_] + mapProjectIdxToDuration[projectIdx_]){
            if(/* oracle approves*/){
                //TODO: chequeo de permisos
                Address.sendValue(payable(beneficiary(projectIdx_)), mapProjectIdxToAmount[projectIdx_]);
            }else {
                //allow claim back
                mapContractWithCanClaim[mapProjectIdxToAddress[projectIdx_]] = true;
            }
        }
    }


}
