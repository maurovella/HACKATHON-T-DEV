import { ethers } from "ethers";

import { RPC_URL, ProjectManagerAddress } from "../contants";

import Project_sol from "./contracts/Project.json"


export default class EtherHelper {
    constructor (web3Provider = null) {
        if (web3Provider)
            this.etherProvider = new ethers.providers.Web3Provider(web3Provider);
        else
            this.etherProvider = new ethers.providers.JsonRpcProvider(RPC_URL);
        
        this.isLogged = Boolean(web3Provider);
    }

    async createProject(metadata) {
        const signer = this.etherProvider.getSigner()
        const Project = new ethers.ContractFactory(Project_sol.ABI, Project_sol.bytecode, signer)
        
        return new Promise(async (resolve, reject) => {
            await Project.deploy(
                signer.address, ProjectManagerAddress, 
                metadata.name, metadata.symbol, metadata.premint, metadata.equityValue, metadata.equity)
                .catch(err => reject(err))
            Project.deployed()
                .then(() => resolve(Project))
                .catch(err => reject(err))
        })
    }
}