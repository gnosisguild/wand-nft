import { expect } from "chai";
import hre, { deployments } from "hardhat";
import "@nomiclabs/hardhat-ethers";

describe.only("WandName", async () => {
  const baseSetup = deployments.createFixture(async () => {
    await deployments.fixture();

    const WandName = await hre.ethers.getContractFactory("WandName");
    const wandName = await WandName.deploy();

    return { wandName };
  });

  describe("WandName", () => {
    it.skip("cycles through namews checks uniqness", async () => {
      const { wandName } = await baseSetup();

      const set = new Set<string>();
      const checkIt = async (stoneId: number) => {
        const name = await wandName.generate(stoneId);
        expect(set.has(name)).to.equal(false);
        set.add(name);
      };
      for (let stoneId = 0; stoneId < 2000000; stoneId++) {
        console.log(stoneId);
        await checkIt(stoneId);
      }
    });
  });
});
