import { ethers } from "ethers";

export default class EtherHelper {
    constructor (web3Provider) {
        this.etherProvider = new ethers.providers.Web3Provider(web3Provider);
    }
}