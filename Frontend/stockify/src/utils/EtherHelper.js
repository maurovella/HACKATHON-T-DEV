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
        const signerAddress = await signer.getAddress()
        const Project = new ethers.ContractFactory(Project_sol.ABI, Project_sol.bytecode, signer)
        
        return new Promise(async (resolve, reject) => {
            const project = await Project.deploy(
                signerAddress, ProjectManagerAddress, 
                metadata.name, metadata.symbol, metadata.premint, metadata.equityValue, metadata.equity)
                .catch(err => reject(err))
            await project.deployed()
                .catch(err => reject(err))
            const ProjectManager = new ethers.Contract(ProjectManagerAddress, ProjectManager_sol.ABI, signer)
            await ProjectManager.createProject(signerAddress, project.address, metadata.duration,  {gasLimit: 50000})
                    .then(() => resolve())
                    .catch(err => reject(err))
        })
    }

    async mintTokens(project_address, amount) { // ammount in Ethers
        const ProjectManager = new ethers.Contract(ProjectManagerAddress, ProjectManager_sol.ABI, signer)
        return new Promise((resolve, reject) => {
            ProjectManager.buyToken(project_address, { value: ethers.utils.parseEther(amount)})
                .then(() => resolve())
                .catch(err => reject(err))
        })
    }
}