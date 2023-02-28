import { expect } from "chai";
import hre, { deployments } from "hardhat";
import "@nomiclabs/hardhat-ethers";

import {
  interpolateStone,
  interpolationParams,
} from "../../apps/minting-app/mimicking";

describe("Conjuror", async () => {
  const baseSetup = deployments.createFixture(async () => {
    await deployments.fixture();

    const cauldron = await deployments.get("Cauldron");
    const incantation = await deployments.get("Incantation");
    const stones = await deployments.get("InceptionStones");

    const WandConjurorExposer = await hre.ethers.getContractFactory(
      "WandConjurorExposer",
      {
        libraries: {
          Cauldron: cauldron.address,
          Incantation: incantation.address,
          InceptionStones: stones.address,
        },
      }
    );
    const wandConjurorExposer = await WandConjurorExposer.deploy();

    return { wandConjurorExposer };
  });

  describe("interpolateStone", () => {
    it("compares interpolated stone in Solidity vs JavaScript", async () => {
      const { wandConjurorExposer } = await baseSetup();

      const checkIt = async (stoneId: number) => {
        const fromSolidity = await wandConjurorExposer._interpolateStone(
          stoneId
        );
        const fromJS = interpolateStone(stoneId);

        expect(fromJS.fractalNoise).to.equal(fromSolidity.fractalNoise);
        expect(fromJS.turbFreqX).to.equal(fromSolidity.turbFreqX);
        expect(fromJS.turbFreqY).to.equal(fromSolidity.turbFreqY);
        expect(fromJS.turbOct).to.equal(fromSolidity.turbOct);
        expect(fromJS.redAmp).to.equal(fromSolidity.redAmp);
        expect(fromJS.redExp).to.equal(fromSolidity.redExp);
        expect(fromJS.redOff).to.equal(fromSolidity.redOff);
        expect(fromJS.greenAmp).to.equal(fromSolidity.greenAmp);
        expect(fromJS.greenExp).to.equal(fromSolidity.greenExp);
        expect(fromJS.greenOff).to.equal(fromSolidity.greenOff);
        expect(fromJS.blueAmp).to.equal(fromSolidity.blueAmp);
        expect(fromJS.blueExp).to.equal(fromSolidity.blueExp);
        expect(fromJS.blueOff).to.equal(fromSolidity.blueOff);
        expect(fromJS.rotation).to.equal(fromSolidity.rotation);
      };

      //random values
      await checkIt(3210);
      await checkIt(3014);
      await checkIt(2794);
      await checkIt(1242);
      await checkIt(355);
      await checkIt(297);
      await checkIt(2765);
      await checkIt(104);
      await checkIt(826);
      await checkIt(2930);
    });

    it("compares param for interpolation calculation in Solidity vs JavaScript", async () => {
      const { wandConjurorExposer } = await baseSetup();

      const checkIt = async (stoneId: number) => {
        const {
          from: solFrom,
          to: solTo,
          progress: solProgress,
        } = await wandConjurorExposer._interpolationParams(stoneId);
        const [jsFrom, jsTo, jsProgress] = interpolationParams(stoneId);
        expect(solFrom).to.equal(jsFrom);
        expect(solTo).to.equal(jsTo);
        expect(solProgress).to.equal(jsProgress);
      };

      // random values
      await checkIt(1251);
      await checkIt(1318);
      await checkIt(1137);
      await checkIt(3016);
      await checkIt(1813);
      await checkIt(3058);
      await checkIt(216);
      await checkIt(1550);
      await checkIt(2820);
      await checkIt(2569);
    });
  });
});
