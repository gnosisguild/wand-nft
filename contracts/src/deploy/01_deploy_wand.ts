import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const allDeployments = await deployments.all();

  const txWandName = await deploy("WandName", {
    from: deployer,
    args: [],
    log: true,
  });

  const txConjuror = await deploy("Conjuror", {
    from: deployer,
    args: [],
    log: true,
    libraries: {
      Template: allDeployments.Template.address,
      WandName: txWandName.address,
    },
  });
  const txZodiacWands = await deploy("ZodiacWands", {
    from: deployer,
    args: [txConjuror.address],
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

export default deploy;
