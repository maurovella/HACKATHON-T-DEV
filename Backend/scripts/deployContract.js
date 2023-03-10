const { ethers } = require("hardhat");


async function deployContract() {
    const ExampleNFT = await ethers.getContractFactory("myMaster") //creo que se corresponde con linea 10 de myContract
    const exampleNFT = await ExampleNFT.deploy()
    await exampleNFT.deployed()
    // This solves the bug in Mumbai network where the contract address is not the real one
    const txHash = exampleNFT.deployTransaction.hash
    const txReceipt = await ethers.provider.waitForTransaction(txHash)
    const contractAddress = txReceipt.contractAddress
    console.log("Contract deployed to address:", contractAddress)
   }

   deployContract()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
