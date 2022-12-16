//este contrato tiene que:
//-poder crear erc20, con una cantidad de tokens a mintear(factory de contrato con 10000000 tokens por 1000usd)
//-poder transferir esos tokens a un cliente con una funcion payable(este balance se tiene que guardar en los erc20 no?)
//-poder hacer withdraw de cada uno de los contratos
//-lockear el withdraw de los contratos hasta cierto timestamp

contract myMaster {
    mapping(address => address) private mapPayeeWithContract; // Payee -> Contract
    mapping(address => uint64) private mapPayeeWithAmount; // Payee -> Amount
    mapping(address => bool) private mapContractWithCanClaim ; // can claim

    mapping(address => uint64) private mapContractToAmount; // ProjectID -> Amount
    mapping(address => uint64) private mapContractToDuration; // ProjectID -> Duration
    mapping(address => uint64) private mapContractToStart //  ProjectID -> Start

    mapping(address => address) private mapContractToBeneficiary; // ProjectID -> OwnerAddress

    //creo que esta esta demas, para que sirve? seria address[] no?
    mapping(address => uint32[]) private mapBeneficiaryProjectList;

    function deployProject() public {

    }

    function beneficiary(address contractAddress) public view virtual returns (address) {
        return mapContractToBeneficiary[contractAddress];
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

        //que devuelve un erc20 ? a que lo quisieron mappear aca? estos mappings estan al reves
        mapProjectIdxToAddress[address] = New erc20();

        mapContractToBeneficiary[address] = ERC20(address).getBeneficiary();
        //TODO check amount


    }

    function buyToken(uint16 adressWallet) payable{
        //require(msg.value > 4 eth);
        //necesito calcular el 4% , cuanto representa cada token de la empresa

        //esta linea no tiene sentido
        require(ERC20(mapProjectIdxToAddress[adressWallet]).canTransfer(msg.value);)

        //Aca debo sumar la plata que tiene la empresa. esta tampoco tiene sentido
        ERC20(mapProjectIdxToAddress[adressWallet]).transferValue(addressWallet, msg.value);

    }


    function release(IERC20 erc20, uint64 quantity) public virtual {
        uint256 amount = releasable(token);
        _erc20Released[tokenid] += amount;
        emit ERC20Released(token, amount);
        SafeERC20.safeTransfer(IERC20(token), beneficiary(), amount);
    }

    function releaseEth(address contractAddress) public {
        if ( block.now  > mapContractToDuration[contractAddress] + mapContractToStart[contractAddress]){
            if(/* oracle approves*/){
                //TODO: chequeo de permisos
                Address.sendValue(payable(beneficiary(contractAddress)), mapContractToAmount[contractAddress]);
            }else {
                mapContractWithCanClaim[contractAddress] = true;
            }
        }
    }


}
