import assert from "assert";
import { keccak256 } from "ethers/lib/utils";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import MerkleTree from "merkletreejs";

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

  const rootHash = await merkleRoot(hre);
  const txZodiacWands = await deploy("ZodiacWands", {
    from: deployer,
    args: [txConjuror.address, rootHash],
    log: true,
  });

  // These are NOT XP thresholds, but the XP amounts to spend to level up to the respective level from the previous one
  const levels = [2000, 2000, 2000, 2000];
  const txForge = await deploy("Forge", {
    from: deployer,
    args: [txZodiacWands.address, levels],
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

async function merkleRoot(hre: HardhatRuntimeEnvironment) {
  if (hre.network.name !== "hardhat") {
    const filePath = process.env["GREENLIST_FILE_PATH"];
    assert(!!filePath, "No greenlist file configured");
    /* eslint-disable-next-line @typescript-eslint/no-var-requires */
    const json = require(filePath);

    return json.root;
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
