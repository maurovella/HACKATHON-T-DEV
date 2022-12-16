import { ethers } from "ethers";

import { ENV, RPC_MAIN, RPC_TEST} from "../contants";

export default class EtherHelper {
    constructor (web3Provider = null) {
        if (web3Provider)
            this.etherProvider = new ethers.providers.Web3Provider(web3Provider);
        else
            this.etherProvider = new ethers.providers.JsonRpcProvider(ENV == 'DEV' ? RPC_TEST : RPC_MAIN);
        
        this.isLogged = Boolean(web3Provider);
    }
}