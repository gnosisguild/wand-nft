import { expect } from "chai";
import hre, { deployments, waffle } from "hardhat";
import "@nomiclabs/hardhat-ethers";

describe("GuildWand", async () => {
  const baseSetup = deployments.createFixture(async () => {
    await deployments.fixture();

    // const WandName = await hre.ethers.getContractFactory("WandName");
    // const wandName = await WandName.deploy();

    const Template = await hre.ethers.getContractFactory("Template");
    const template = await Template.deploy();

    const WandConjuror = await hre.ethers.getContractFactory("WandConjuror", {
      libraries: { Template: template.address },
    });
    const wandConjuror = await WandConjuror.deploy();

    const Wand = await hre.ethers.getContractFactory("Wand");
    const wand = await Wand.deploy(wandConjuror.address);

    await wand.mintWand();

    const latBerlin = 52.5422;
    const lngBerlin = 13.3495;
    const maxInt16 = 2 ** 16 / 2 - 1;

    const shape0Rhythm0 = 0;
    await wand.build(
      0,
      shape0Rhythm0,
      Math.round((latBerlin * maxInt16) / 90),
      Math.round((lngBerlin * maxInt16) / 180)
    );

    return { Wand, wand, WandConjuror, wandConjuror };
  });

  const [user1] = waffle.provider.getWallets();

  describe("initialize", () => {
    it("should initialize NFT contract", async () => {
      const { wand } = await baseSetup();
      const uri = await wand.tokenURI(0);
      console.log(uri);
    });
  });

  // describe("should correctly calculate the current position of the sun", async () => {
  //   const { wandConjuror } = await baseSetup();
  //   const [minuteInDay, zenithAngle] =
  //     await wandConjuror.calculateSolarPosition();
  //   expect(minuteInDay).to.equal(1);
  //   expect(zenithAngle).to.equal(1);
  // });
});
