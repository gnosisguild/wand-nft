import { expect } from "chai";
import hre, { deployments, waffle } from "hardhat";
import "@nomiclabs/hardhat-ethers";

import {
  encodeHalo,
  calculatePlanets,
  calculateAspects,
  scalePlanets,
  scaleAspects,
  generateHalo,
  generateName,
  filterLayers,
  generateSparkles,
  generateHandle,
  xp,
  stoneList,
} from "../../apps/minting-app/template";

import renderSvgTemplate from "./renderSvgTemplate";

describe("GuildWand", async () => {
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

    const Wand = await hre.ethers.getContractFactory("Wand");
    const wand = await Wand.deploy(wandConjuror.address);

    await wand.mintWand();

    return { wand };
  });

  const [user1] = waffle.provider.getWallets();

  describe.skip("while not yet built", () => {
    it("TODO", async () => {
      const { wand } = await baseSetup();
      const uri = await wand.tokenURI(0);
      console.log(uri);
    });
  });

  describe("SVG generation", () => {
    it("it render the template with the same results as JavaScript", async () => {
      const { wand } = await baseSetup();

      const tokenId = 0;
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

      await wand.build(
        tokenId,
        stone,
        handle,
        encodeHalo(haloShape, haloRhythm),
        background,
        planets,
        aspects
      );
      const tokenUri = await wand.tokenURI(0);
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
      console.log(svgFromContract);
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
        stone: stoneList[stone],
        xp,
        handle: generateHandle(handle),
      });
      console.log({
        planets,
        aspects,
        sp: scalePlanets(planets),
        sa: scaleAspects(aspects),
      });
      expect(svgFromContract).to.equal(svgFromHandlebars);
    });
  });
});
