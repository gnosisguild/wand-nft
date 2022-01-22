// import hre, { ethers, network, waffle, deployments } from "hardhat";

// async function main() {
//   const { deployments } = hre;
//   const [deployer] = await ethers.getSigners();
//   const { deploy } = deployments;

//   console.log("Deploying contracts with the account:", deployer.address);
//   console.log("Account balance:", (await deployer.getBalance()).toString());

//   const Wand = await ethers.getContractFactory("Wand");
//   const wand = await Wand.deploy({gasPrice: 20000000000});

//   console.log("Wand address:", wand.address);
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });