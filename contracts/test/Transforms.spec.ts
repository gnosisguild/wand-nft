import { expect } from "chai";
import hre, { deployments } from "hardhat";
import "@nomiclabs/hardhat-ethers";

import {
  calculateAspects,
  calculatePlanets,
} from "../../apps/minting-app/birthchart";

import {
  packForMinting,
  transformForRendering,
  transformRotations,
} from "../../apps/minting-app/state/transforms";

import { AppState, MintStage } from "../../apps/minting-app/types";

describe("Transforms", async () => {
  const baseSetup = deployments.createFixture(async () => {
    await deployments.fixture();

    const TestPacker = await hre.ethers.getContractFactory("TestPacker");
    const testPacker = await TestPacker.deploy();

    return { testPacker };
  });

  describe("forMint", () => {
    it("planets", async () => {
      const { testPacker } = await baseSetup();

      const date = new Date("2022-07-12");

      const [, , , , jsPlanets, , jsVisibility] = packForMinting(state(), date);
      const sol = await testPacker.packPlanets(
        calculatePlanets(state().latitude, state().longitude, 0, date)
      );

      expect(jsPlanets).to.deep.equal(sol[0]);
      expect(jsVisibility).to.deep.equal(sol[1]);
    });

    it("aspects", async () => {
      const { testPacker } = await baseSetup();

      const date = new Date("2022-07-12");

      const [, , , , , js] = packForMinting(state(), date);
      const sol = await testPacker.packAspects(
        calculateAspects(state().latitude, state().longitude, 0, date)
      );
      expect(js).to.deep.equal(sol);
    });

    it("background", async () => {
      const { testPacker } = await baseSetup();
      const [, , , js] = packForMinting(state());
      const background = transformRotations(state()).background;
      const sol = await testPacker.packBackground({
        color: background.color,
        dark: background.dark || false,
        radial: background.radial || false,
      });
      expect(js).to.deep.equal(sol);
    });
  });

  describe("forRendering", () => {
    it("wide halo", async () => {
      const { testPacker } = await baseSetup();
      const state = wideHalo();

      const [, packedHalo] = packForMinting(state);

      const js = transformForRendering(state, 0).halo;
      const sol = await testPacker.unpackHalo(packedHalo);
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

const latBerlin = 52.5422;
const lngBerlin = 13.3495;

function state(): AppState {
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

  return {
    stone: 1,
    handle: 2,
    background,
    halo: {
      shape: 1,
      rhythm: [
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
      ],
    },
    latitude: latBerlin,
    longitude: lngBerlin,
    // doesnt matter
    stage: MintStage.IDLE,
    tokenId: -1,
    showJourney: false,
  };
}

function wideHalo(): AppState {
  return {
    ...state(),
    halo: {
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
    },
  };
}
