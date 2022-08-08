import { expect } from "chai";
import hre, { deployments, waffle } from "hardhat";
import "@nomiclabs/hardhat-ethers";

import {
  calculatePlanets,
  calculateAspects,
  scalePlanets,
  scaleAspects,
  generateHalo,
  generateName,
  filterLayers,
  generateSparkles,
  generateHandle,
  interpolateStone,
} from "../../apps/minting-app/template";

import renderSvgTemplate from "./renderSvgTemplate";
import { Contract } from "ethers";

describe("ZodiacWands", async () => {
  const baseSetup = deployments.createFixture(async () => {
    await deployments.fixture();

    const [signer] = await hre.ethers.getSigners();

    const deployment = await deployments.get("ZodiacWands");
    const zodiacWands = new Contract(
      deployment.address,
      deployment.abi,
      signer
    );

    return { zodiacWands };
  });

  describe("SVG generation", () => {
    it("it render the template with the same results as JavaScript", async () => {
      const { zodiacWands } = await baseSetup();

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

      const tx = await zodiacWands.mint(
        stone,
        generateHandle(handle),
        generateHalo(haloShape, haloRhythm, background.color.hue),
        background,
        planets,
        aspects
      );

      await tx.wait();

      const tokenId = 0;
      const tokenUri = await zodiacWands.tokenURI(tokenId);
      const tokenUriJson = JSON.parse(
        atob(
          // remove the prefix
          tokenUri.substring("data:application/json;base64,".length)
        )
      );
      const svgFromContract = atob(
        // remove the prefix
        tokenUriJson.image.substring("data:image/svg+xml;base64,".length)
      );

      // generate SVG via handlebars.js
      const svgFromHandlebars = renderSvgTemplate({
        planets: scalePlanets(planets),
        aspects: scaleAspects(aspects),
        halo: generateHalo(haloShape, haloRhythm, background.color.hue),
        frame: {
          level1: true,
          title: generateName(tokenId),
        },
        background,
        filterLayers,
        sparkles: generateSparkles(tokenId),
        seed: tokenId,
        stone: interpolateStone(stone),
        xp: {
          amount: 0,
          cap: 10000,
          crown: false,
        },
        handle: generateHandle(handle),
      });

      expect(svgFromContract).to.equal(svgFromHandlebars);
    });
  });
});
