import { expect } from "chai";
import hre, { deployments } from "hardhat";
import "@nomiclabs/hardhat-ethers";

import {
  calculateAspects,
  calculatePlanets,
  interpolateStone,
  interpolationParams,
} from "../../apps/minting-app/template";
import {
  packAspects,
  packBackground,
  packPlanets,
} from "../../apps/minting-app/components/mint-button/packing";
import { BigNumber } from "ethers";

describe("Packing", async () => {
  const baseSetup = deployments.createFixture(async () => {
    await deployments.fixture();

    const template = await deployments.get("Template");
    const wandName = await deployments.get("WandName");

    const TestPacker = await hre.ethers.getContractFactory("TestPacker");
    const testPacker = await TestPacker.deploy();

    return { testPacker };
  });

  describe("mint packing", () => {
    it("planets", async () => {
      const { testPacker } = await baseSetup();
      const { planets } = args();

      const js = packPlanets(planets);
      const sol = await testPacker.packPlanets(planets);
      expect(js[0]).to.equal(sol[0]);
      expect(js[1]).to.equal(sol[1]);
    });

    it("aspects", async () => {
      const { testPacker } = await baseSetup();
      const { aspects } = args();
      const js = packAspects(aspects);
      const sol = await testPacker.packAspects(aspects);
      expect(js).to.equal(sol);
    });

    it("background", async () => {
      const { testPacker } = await baseSetup();
      const { background } = args();
      const js = packBackground(background);
      const sol = await testPacker.packBackground(background);
      expect(js).to.equal(sol);
    });
  });
});

function args() {
  const stone = 1;
  const handle = 2;

  const background = {
    hue: 0,
    radial: true,
    dark: true,
    color: {
      hue: 281,
      saturation: 33,
      lightness: 41,
    },
  };

  const latBerlin = 52.5422;
  const lngBerlin = 13.3495;
  const planets = calculatePlanets(
    latBerlin,
    lngBerlin,
    0,
    new Date("2022-07-12")
  );

  const aspects = calculateAspects(
    latBerlin,
    lngBerlin,
    0,
    new Date("2022-07-12")
  );
  const haloShape = 1;
  const haloRhythm = [
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    false,
  ];

  return {
    stone,
    handle,
    background,
    planets,
    aspects,
    halo: {
      shape: haloShape,
      rhythm: haloRhythm,
    },
  };
}
