import { ethers } from "ethers";

import { RPC_URL } from "../contants";

export default class EtherHelper {
    constructor (web3Provider = null) {
        if (web3Provider)
            this.etherProvider = new ethers.providers.Web3Provider(web3Provider);
        else
            this.etherProvider = new ethers.providers.JsonRpcProvider(RPC_URL);
        
        this.isLogged = Boolean(web3Provider);
    }
}