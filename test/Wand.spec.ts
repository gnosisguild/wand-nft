import { expect } from "chai";
import hre, { deployments, waffle, ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";

const ZeroState =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
const ZeroAddress = "0x0000000000000000000000000000000000000000";
const FirstAddress = "0x0000000000000000000000000000000000000001";

describe("GuildWand", async () => {
  const baseSetup = deployments.createFixture(async () => {
    await deployments.fixture();

    // const WandName = await hre.ethers.getContractFactory("WandName");
    // const wandName = await WandName.deploy();
    const HaloSVG1 = await hre.ethers.getContractFactory("HaloSVG1");
    const haloSVG1 = await HaloSVG1.deploy();
    const HaloSVG2 = await hre.ethers.getContractFactory("HaloSVG2");
    const haloSVG2 = await HaloSVG2.deploy();
    const HaloSVG3 = await hre.ethers.getContractFactory("HaloSVG3");
    const haloSVG3 = await HaloSVG3.deploy();
    const HaloSVG4 = await hre.ethers.getContractFactory("HaloSVG4");
    const haloSVG4 = await HaloSVG4.deploy();

    const abiCoder = new ethers.utils.AbiCoder();
    const haloSVGs = abiCoder.encode(
      [
        "address haloSVGs1",
        "address haloSVGs2",
        "address haloSVGs3",
        "address haloSVGs4",
      ],
      [haloSVG1.address, haloSVG2.address, haloSVG3.address, haloSVG4.address]
    );
    // const test = abiCoder.decode(["address haloSVGs1", "address haloSVGs2", "address haloSVGs3", "address haloSVGs4"], haloSVGs)
    // console.log(test.haloSVGs1)
    const HaloGenerator = await hre.ethers.getContractFactory("HaloGenerator");
    const haloGenerator = await HaloGenerator.deploy(haloSVGs);

    const WandConjuror = await hre.ethers.getContractFactory("WandConjuror");
    const wandConjuror = await WandConjuror.deploy(haloGenerator.address);

    const Wand = await hre.ethers.getContractFactory("Wand");
    const wand = await Wand.deploy(wandConjuror.address);

    await wand.mintWand();
    await wand.build(0);

    return { Wand, wand };
  });

  const [user1] = waffle.provider.getWallets();

  describe("initialize", async () => {
    it("should initialize NFT contract", async () => {
      const { wand } = await baseSetup();
      const uri = await wand.tokenURI(0);
      console.log(uri);
    });
  });
});
