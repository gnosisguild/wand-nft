import { expect } from "chai";
import hre, { deployments } from "hardhat";
import "@nomiclabs/hardhat-ethers";

import {
  interpolateStone,
  packStoneId,
  unpackStoneId,
} from "../../apps/minting-app/template";

describe("WandConjuror", async () => {
  const baseSetup = deployments.createFixture(async () => {
    await deployments.fixture();

    const WandName = await hre.ethers.getContractFactory("WandName");
    const wandName = await WandName.deploy();

    const BackgroundLayer = await hre.ethers.getContractFactory(
      "BackgroundLayer"
    );
    const backgroundLayer = await BackgroundLayer.deploy();
    const FrameLayer = await hre.ethers.getContractFactory("FrameLayer");
    const frameLayer = await FrameLayer.deploy();
    const HandleLayer = await hre.ethers.getContractFactory("HandleLayer");
    const handleLayer = await HandleLayer.deploy();
    const Template = await hre.ethers.getContractFactory("Template", {
      libraries: {
        BackgroundLayer: backgroundLayer.address,
        FrameLayer: frameLayer.address,
        HandleLayer: handleLayer.address,
      },
    });
    const template = await Template.deploy();

    const WandConjuror = await hre.ethers.getContractFactory("WandConjuror", {
      libraries: { Template: template.address, WandName: wandName.address },
    });
    const wandConjuror = await WandConjuror.deploy();

    const WandConjurorExposer = await hre.ethers.getContractFactory(
      "WandConjurorExposer",
      {
        libraries: { Template: template.address, WandName: wandName.address },
      }
    );
    const wandConjurorExposer = await WandConjurorExposer.deploy();

    const Wand = await hre.ethers.getContractFactory("Wand");
    const wand = await Wand.deploy(wandConjuror.address);

    await wand.mintWand();

    return { wand, wandConjuror, wandConjurorExposer };
  });

  describe("interpolateStone", () => {
    it.only("compares interpolated stone in Solidity vs JavaScript", async () => {
      const { wandConjurorExposer } = await baseSetup();

      const checkIt = async (from: number, to: number, progress: number) => {
        const stoneId = packStoneId(from, to, progress);
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

      // cycling through all takes time
      // for (let from = 0; from < 29; from++) {
      //   for (let to = from; to < 29; to++) {
      //     for (let progress = 0; progress <= 100; progress++) {
      //       console.log(from, to, progress);
      //       await checkIt(from, to, progress);
      //     }
      //   }
      // }

      // random values
      checkIt(26, 11, 61);
      checkIt(23, 27, 45);
      checkIt(13, 4, 79);
      checkIt(2, 14, 76);
      checkIt(1, 12, 92);
      checkIt(14, 22, 82);
      checkIt(0, 12, 2);
      checkIt(22, 17, 30);
      checkIt(7, 7, 5);
    });

    it.only("compares stoneId extraction in Solidity vs JavaScript", async () => {
      const { wandConjurorExposer } = await baseSetup();

      const checkIt = async (from: number, to: number, progress: number) => {
        const stoneId = packStoneId(from, to, progress);

        const {
          from: solFrom,
          to: solTo,
          progress: solProgress,
        } = await wandConjurorExposer._unpackStoneId(stoneId);

        const [jsFrom, jsTo, jsProgress] = unpackStoneId(stoneId);

        expect(solFrom).to.equal(jsFrom);
        expect(solTo).to.equal(jsTo);
        expect(solProgress).to.equal(jsProgress);
        expect(from).to.equal(jsFrom);
        expect(to).to.equal(jsTo);
        expect(progress).to.equal(jsProgress);
      };

      // cycling through all takes time
      // for (let from = 0; from < 29; from++) {
      //   for (let to = from; to < 29; to++) {
      //     for (let progress = 0; progress <= 100; progress++) {
      //       console.log(from, to, progress);
      //       await checkIt(from, to, progress);
      //     }
      //   }
      // }

      // random values
      checkIt(28, 22, 53);
      checkIt(23, 14, 88);
      checkIt(5, 0, 86);
      checkIt(20, 27, 22);
      checkIt(23, 23, 48);
      checkIt(21, 27, 88);
      checkIt(19, 10, 49);
      checkIt(2, 4, 45);
      checkIt(4, 25, 85);
      checkIt(14, 9, 65);

      checkIt(0, 1, 10);
      checkIt(0, 1, 50);
      checkIt(0, 1, 99);
      checkIt(0, 28, 2);
      checkIt(0, 28, 45);
      checkIt(0, 28, 97);
      checkIt(15, 16, 0);
      checkIt(15, 16, 30);
      checkIt(15, 16, 50);
    });
  });
});
