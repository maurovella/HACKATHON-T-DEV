import { ethers } from "ethers";

import { RPC_URL, ProjectManagerAddress } from "../contants";

import Project_sol from "./contracts/Project.json"
import ProjectManager_sol from "./contracts/ProjectManager.json"

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
            await Project.deployed()
                .catch(err => reject(err))
            const ProjectManager = ethers.Contract(ProjectManagerAddress, ProjectManager_sol.ABI, signer)
            await ProjectManager.createProject(signer.address, Project.address, metadata.duration)
                    .then(() => resolve())
                    .catch(err => reject(err))
        })
    }
}