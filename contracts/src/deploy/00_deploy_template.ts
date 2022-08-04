import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  console.log("*****************************************************");
  console.log(`Deployer: ${deployer}*`);
  console.log("*****************************************************");
  const txHandleLayer = await deploy("HandleLayer", {
    from: deployer,
    args: [],
    log: true,
  });
  const txFrameLayer = await deploy("FrameLayer", {
    from: deployer,
    args: [],
    log: true,
  });
  const txBackgroundLayer = await deploy("BackgroundLayer", {
    from: deployer,
    args: [],
    log: true,
  });
  await deploy("Template", {
    from: deployer,
    args: [],
    log: true,
    libraries: {
      HandleLayer: txHandleLayer.address,
      FrameLayer: txFrameLayer.address,
      BackgroundLayer: txBackgroundLayer.address,
    },
  });
};

export default deploy;
