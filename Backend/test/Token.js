const { expect, assert } = require("chai");
const { ethers } = require("hardhat");



describe("Token contract", function () {
  before(async function(){
     [owner,addr1,addr2] = await ethers.getSigners();
     Token = await ethers.getContractFactory("myMaster",owner);
     hardhatToken = await Token.deploy();
     hardhatToken.deployed();
     txHash =await hardhatToken.deployTransaction.hash;
     txReceipt = await ethers.provider.waitForTransaction(txHash);
     contractAddress = txReceipt.contractAddress;
     
  } )
 
 it("Deployment should assign the total supply of tokens to the owner", async function () {
    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    const totalSupply = await hardhatToken.totalSupply();
    expect(Number(totalSupply)).to.equal(Number(ownerBalance));
  }); 
  it("Mint nft Test", async function() {
    const [addr1] = await ethers.getSigners();
    const tokenId = await Token.attach(contractAddress).mintNFT(addr1.address , META_DATA_URL,addr1.address);
    const totalSupply = await Token.attach(contractAddress).totalSupply();
   // await console.log(Number(await Token.attach(contractAddress).balanceOf(addr1.address)));
    expect(Number(await Token.attach(contractAddress).balanceOf(addr1.address))).to.equal(1)
   
  });
  it("No owner mint",async function(){
    await expect( hardhatToken.connect(addr1).mintNFT(addr1.address , META_DATA_URL,addr1.address)).to.be.revertedWith('Ownable: caller is not the owner');
  });
  it("Tranfer test",async function(){

      const id = await hardhatToken.mintNFT(owner.address, META_DATA_URL,addr1.address);
      const rc = await id.wait(); 

      const event = rc.events.find(event => event.event === 'Transfer');   // catcheo el evento que lanza el smart contract
      const [from, to, value] = event.args;

     await expect(hardhatToken.transferFrom(owner.address,addr2.address,Number(value)))
     .to.emit(hardhatToken, "Transfer")
     .withArgs(owner.address, addr2.address, 2);    
       expect(Number(await hardhatToken.balanceOf(addr2.address))).to.equal(1);

  });
  // Con este testeo lo que hago es probar que si le pagamos a la funcion transfer entonces 
  // el valor que va a tener el balance del contract va a subir
  it("Payable functions test",async function(){

    const id = await hardhatToken.mintNFT(owner.address, META_DATA_URL,addr1.address);
    const rc = await id.wait(); 

    const event = rc.events.find(event => event.event === 'Transfer');   // catcheo el evento que lanza el smart contract
    const [from, to, value] = event.args;

   await hardhatToken.transferFromPayable(owner.address,addr2.address,Number(value),{
      value: ethers.utils.parseEther("1000.0")
   });
   const contractBalance = await ethers.provider.getBalance(hardhatToken.address);
   let price = ethers.utils.formatUnits(contractBalance.toString(), "ether");
   // Lo que quiero ahora es obtener ese ethereum
   const ownerBalance = await ethers.provider.getBalance(owner.address);
   let ownerPrice = ethers.utils.formatUnits(ownerBalance.toString(), "ether");


   // Aca le devuelvo la guita al owner
   await hardhatToken.connect(addr1).transferAll();
   const ownerBalance2 = await ethers.provider.getBalance(addr1.address);
   let ownerPrice2 = ethers.utils.formatUnits(ownerBalance.toString(), "ether");
   console.log(ownerPrice2);
   // Me fijo que lo que tenia antes sea menor que despues de lo obtener
});
});