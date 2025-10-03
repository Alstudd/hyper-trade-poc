const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  const TOKEN = await hre.ethers.getContractFactory("TOKEN");
  const token = await TOKEN.deploy(deployer.address);

  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();

  console.log("TOKEN deployed to:", tokenAddress);
  console.log("Initial supply:", await token.totalSupply());
  console.log("Owner balance:", await token.balanceOf(deployer.address));

  console.log("\nDeployment Summary:");
  console.log("==================");
  console.log(`TOKEN Contract: ${tokenAddress}`);
  console.log(`Network: ${hre.network.name}`);
  console.log(`Deployer: ${deployer.address}`);
  
  return {
    token: tokenAddress,
    deployer: deployer.address
  };
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = main;