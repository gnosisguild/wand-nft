import hre, { ethers, network, waffle, deployments } from "hardhat";
import Wand from "../../artifacts/contracts/Wand.sol/Wand.json";
import * as fs from 'fs';

async function main() {
  const { deployments } = hre;
  const [deployer] = await ethers.getSigners();
  const { deploy } = deployments;

  const wand = new ethers.Contract(
    "0x1084bdfc5bfFD0941d6E1Df68F2757fd46294bb3",
    Wand.abi,
    deployer
  )

  const svg = fs.readFileSync(__dirname+"/test.svg", {encoding: "utf8"})
  const tx = await wand.mintWand(svg)
  await tx.wait()
  const uri = await wand.tokenURI(2)
  console.log(uri)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
