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
import { AppState, MintStage } from "../../apps/minting-app/types";
import MerkleTree from "merkletreejs";
import { Forge__factory, ZodiacWands } from "../typechain-types";

describe("ZodiacWands", async () => {
  const baseSetup = deployments.createFixture(async () => {
    await deployments.fixture();

    const signers = await hre.ethers.getSigners();
    const [signer] = signers;

    const deployment = await deployments.get("ZodiacWands");
    const zodiacWands = new Contract(
      deployment.address,
      deployment.abi,
      signer
    ) as ZodiacWands;

    const elements = await Promise.all(signers.map((s) => s.getAddress()));
    const merkleTree = new MerkleTree(elements, keccak256, {
      hashLeaves: true,
      sortPairs: true,
    });

    const getPermit = (minter: string) => {
      const proof = merkleTree.getHexProof(keccak256(minter));
      return { proof, signature: "0x" };
    };

    return { zodiacWands, getPermit };
  });

  describe("SVG generation", () => {
    it("it render the template with the same results as JavaScript (fresh mint)", async () => {
      const [signer] = await hre.ethers.getSigners();
      const { zodiacWands, getPermit } = await baseSetup();

      const background = {
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
        stage: MintStage.IDLE,
        tokenId: -1,
        showJourney: false,
      };
      const date = new Date("2022-10-01");

      const tx = await zodiacWands.mint(
        ...packForMinting(state, date),
        getPermit(signer.address)
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
      const svgFromSol = atob(
        // remove the prefix
        tokenUriJson.image.substring("data:image/svg+xml;base64,".length)
      );

      const seed = parseInt(keccak256(signer.address).slice(-4), 16);

      const svgFromJS = renderSvgTemplate({
        ...transformForRendering(state, seed, date),
        // sparkles and name are not on the preview, we mimick solidity
        sparkles: generateSparkles(tokenId),
        frame: {
          level1: true,
          title: generateName(tokenId),
        },
        xp: { amount: 0, cap: 2000, crown: false },
      });

      expect(svgFromSol).to.equal(svgFromJS);
    });

    it("it render the template with the same results as JavaScript (level 2)", async () => {
      const [signer, minter] = await hre.ethers.getSigners();
      const { zodiacWands, getPermit } = await baseSetup();

      const forgeAddress = await zodiacWands.forge();
      const forge = Forge__factory.connect(forgeAddress, signer);

      const background = {
        radial: false,
        dark: false,
        color: {
          hue: 11,
          saturation: 22,
          lightness: 33,
        },
      };

      const latBrooklyn = 40.6782;
      const lngBrooklyn = -73.9442;

      const state: AppState = {
        stone: 222,
        handle: 3,
        background,
        latitude: latBrooklyn,
        longitude: lngBrooklyn,
        halo: {
          shape: 2,
          rhythm: [
            true,
            true,
            false,
            false,
            true,
            true,
            false,
            false,
            true,
            true,
            true,
            true,
            true,
          ],
        },
        // doesnt matter
        stage: MintStage.IDLE,
        tokenId: -1,
      };
      const date = new Date("2022-10-01");

      const xpAccrued = 6000;
      const levelUpCost = 2000;

      const tx = await zodiacWands
        .connect(minter)
        .mint(...packForMinting(state, date), getPermit(minter.address));
      await tx.wait();
      const tokenId = 0;

      const wandOwner = await zodiacWands.ownerOf(tokenId);
      expect(wandOwner).to.equal(minter.address);

      await forge.adjustXp(wandOwner, xpAccrued); // give XP to wand owner
      await forge.connect(minter).levelUp(tokenId, 1); // wand owner redeems XP for leveling up the wand
      expect(await forge.level(tokenId)).to.equal(1);

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

      const seed = parseInt(keccak256(minter.address).slice(-4), 16);

      const svgFromJS = renderSvgTemplate({
        ...transformForRendering(state, seed, date),
        // sparkles and name are not on the preview, we mimick solidity
        sparkles: generateSparkles(tokenId),
        frame: {
          level2: true,
          title: generateName(tokenId),
        },
        xp: { amount: xpAccrued - levelUpCost, cap: levelUpCost, crown: true },
      });

      expect(svgFromSol).to.equal(svgFromJS);
    });
  });
});
