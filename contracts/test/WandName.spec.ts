import { expect } from "chai";
import hre, { deployments } from "hardhat";
import "@nomiclabs/hardhat-ethers";
import { Contract } from "ethers";

describe("WandName", async () => {
  const baseSetup = deployments.createFixture(async () => {
    await deployments.fixture();

    const deployment = await deployments.get("WandName");

    const wandName = new Contract(deployment.address, deployment.abi);

    return { wandName };
  });

  describe("WandName", () => {
    it.skip("cycles through namews checks uniqness", async () => {
      const { wandName } = await baseSetup();

      const set = new Set<string>();
      const checkIt = async (stoneId: number) => {
        const name = await wandName.generate(stoneId);
        console.log(`${stoneId} ${name}`);
        expect(set.has(name)).to.equal(false);
        set.add(name);
      };
      for (let stoneId = 0; stoneId < 1000000; stoneId++) {
        await checkIt(stoneId);
      }
    });
  });
});
