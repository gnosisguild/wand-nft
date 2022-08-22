import { expect } from "chai";
import { Contract } from "ethers";
import hre, { deployments } from "hardhat";
import "@nomiclabs/hardhat-ethers";

import {
  generateName,
  generateSparkles,
} from "../../apps/minting-app/mimicking";
import renderSvgTemplate from "./renderSvgTemplate";
import { packForMinting } from "../../apps/minting-app/state/transforms/forMinting";
import { transformForRendering } from "../../apps/minting-app/state/transforms/forRendering";
import { keccak256 } from "ethers/lib/utils";
import { AppState } from "../../apps/minting-app/types";

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

      const state: AppState = {
        stone: 1,
        handle: 2,
        background,
        latitude: latBerlin,
        longitude: lngBerlin,
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
        // doesnt matter
        minting: false,
        tokenId: -1,
      };

      const tx = await zodiacWands.mint(...packForMinting(state));

      await tx.wait();

      const tokenId = 0;
      const tokenUri = await zodiacWands.tokenURI(tokenId);
      const tokenUriJson = JSON.parse(
        atob(
          // remove the prefix
          tokenUri.substring("data:application/json;base64,".length)
        )
      );
      const svgFromSol = atob(
        // remove the prefix
        tokenUriJson.image.substring("data:image/svg+xml;base64,".length)
      );

      const [signer] = await hre.ethers.getSigners();

      const seed = parseInt(keccak256(signer.address).slice(-4), 16);

      const svgFromJS = renderSvgTemplate({
        ...transformForRendering(state, seed),
        // sparkles and name are not on the preview, we mimick solidity
        sparkles: generateSparkles(tokenId),
        frame: {
          level1: true,
          title: generateName(tokenId),
        },
      });

      expect(svgFromSol).to.equal(svgFromJS);
    });
  });
});
