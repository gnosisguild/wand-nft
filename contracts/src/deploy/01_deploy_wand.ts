import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import MerkleTree from "merkletreejs";
import { keccak256 } from "../tasks/proofdb";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const allDeployments = await deployments.all();

  const txIncantation = await deploy("Incantation", {
    from: deployer,
    args: [],
    log: true,
  });

  const txConjuror = await deploy("Conjuror", {
    from: deployer,
    args: [],
    log: true,
    libraries: {
      Cauldron: allDeployments.Cauldron.address,
      Incantation: txIncantation.address,
    },
  });
  const rootHash = await computeRootHash(hre);
  const txZodiacWands = await deploy("ZodiacWands", {
    from: deployer,
    args: [txConjuror.address, rootHash],
    log: true,
  });
  const txForge = await deploy("Forge", {
    from: deployer,
    args: [txZodiacWands.address],
    log: true,
  });

  if (hre.network.name !== "hardhat") {
    console.log("Connecting Wands to deployed Forge");
  }

  const zodiacWands = await hre.ethers.getContractAt(
    "ZodiacWands",
    txZodiacWands.address,
    hre.ethers.provider.getSigner(deployer)
  );
  await zodiacWands.setForge(txForge.address);
};

async function computeRootHash(hre: HardhatRuntimeEnvironment) {
  if (hre.network.name !== "hardhat") {
    throw new Error("AAAAA");
  } else {
    const signers = await hre.ethers.getSigners();
    const elements = await Promise.all(signers.map((s) => s.getAddress()));
    const merkleTree = new MerkleTree(elements, keccak256, {
      hashLeaves: true,
      sortPairs: true,
    });

    return merkleTree.getHexRoot();
  }
}

export default deploy;
