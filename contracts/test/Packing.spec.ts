import { expect } from "chai";
import hre, { deployments } from "hardhat";
import "@nomiclabs/hardhat-ethers";

import {
  calculateAspects,
  calculatePlanets,
  generateHalo,
} from "../../apps/minting-app/template";
import {
  packAspects,
  packBackground,
  packHalo,
  packPlanets,
} from "../../apps/minting-app/components/MintButton/packing";
import { Halo } from "../../apps/minting-app/types";

describe("Packing", async () => {
  const baseSetup = deployments.createFixture(async () => {
    await deployments.fixture();

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

  describe("unpacking", () => {
    it("wide halo", async () => {
      const { testPacker } = await baseSetup();
      const halo = wideHalo();

      const js = generateHalo(halo.shape, halo.rhythm, 0);
      const sol = await testPacker.unpackHalo(packHalo(halo));
      expect(js.halo0).to.equal(sol.halo0);
      expect(js.halo1).to.equal(sol.halo1);
      expect(js.halo2).to.equal(sol.halo2);
      expect(js.halo3).to.equal(sol.halo3);
      expect(js.halo4).to.equal(sol.halo4);
      expect(js.halo5).to.equal(sol.halo5);

      expect(js.rhythm).to.deep.equal(sol.rhythm);
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

function wideHalo(): Halo {
  return {
    shape: 3,
    rhythm: [
      false,
      false,
      true,
      false,
      false,
      true,
      false,
      true,
      true,
      false,
      true,
      false,
      true,
    ],
  };
}
