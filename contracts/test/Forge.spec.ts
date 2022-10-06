import { expect } from "chai";
import hre, { deployments, ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";
import { Contract, Signer } from "ethers";
import { Forge__factory, ZodiacWands } from "../typechain-types";
import MerkleTree from "merkletreejs";
import { AppState, MintStage } from "../../apps/minting-app/types";
import { packForMinting } from "../../apps/minting-app/state/transforms";

describe("Forge", async () => {
  const baseSetup = deployments.createFixture(async () => {
    await deployments.fixture();

    const signers = await hre.ethers.getSigners();
    const [contractOwner, wandHolder, otherWandHolder] = signers;

    const deployment = await deployments.get("ZodiacWands");
    const zodiacWands = new Contract(
      deployment.address,
      deployment.abi,
      contractOwner
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

    const forgeAddress = await zodiacWands.forge();
    const forge = Forge__factory.connect(forgeAddress, contractOwner);

    const wandTokenId = await mintWand(
      zodiacWands,
      wandHolder,
      getPermit(wandHolder.address)
    );
    const otherWandTokenId = await mintWand(
      zodiacWands,
      otherWandHolder,
      getPermit(otherWandHolder.address)
    );

    return {
      zodiacWands,
      forge,
      contractOwner,
      wandTokenId,
      wandHolder,
      otherWandTokenId,
      otherWandHolder,
    };
  });

  const keccak256 = (input: string) => {
    const toBytes =
      typeof input === "string" && !ethers.utils.isHexString(input);

    return ethers.utils.keccak256(
      toBytes ? ethers.utils.toUtf8Bytes(input) : input
    );
  };

  describe("adjustXp", function () {
    it("reverts if not called by contract owner", async function () {});

    it("updates the XP of the account", async function () {
      const { forge, wandHolder } = await baseSetup();

      const xp = 100;
      await forge.adjustXp(wandHolder.address, xp);
      expect(await forge.xp(wandHolder.address)).to.equal(xp);
      expect(await forge.xpSpent(wandHolder.address)).to.equal(0);
    });

    it("adjusts spent XP if the new XP amount is lower", async function () {
      const { forge, wandHolder, wandTokenId } = await baseSetup();

      const cost = await forge.levelUpCost(0);
      const accruedXp = cost + 200;

      await forge.adjustXp(wandHolder.address, accruedXp);
      await forge.connect(wandHolder).levelUp(wandTokenId, 1);
      expect(await forge.xpSpent(wandHolder.address)).to.equal(cost);
      expect(await forge.xp(wandHolder.address)).to.equal(accruedXp);

      await forge.adjustXp(wandHolder.address, 100);
      expect(await forge.xp(wandHolder.address)).to.equal(100);
      expect(await forge.xpSpent(wandHolder.address)).to.equal(100);
    });

    it.skip('emits "XpAdjusted" event', async function () {
      const { forge, wandHolder } = await baseSetup();

      const xp = 100;
      const tx = await forge.adjustXp(wandHolder.address, xp);
      const receipt = await tx.wait();

      const event = receipt.events?.find((e) => e.event === "XpAdjusted");
      expect(event?.args?.xp).to.equal(xp);
    });
  });

  describe("levelUp", function () {
    it("reverts if the wand is not owned by the sender", async function () {
      const { forge, wandTokenId, wandHolder } = await baseSetup();

      await forge.adjustXp(wandHolder.address, 128);

      await expect(forge.levelUp(wandTokenId, 1)).to.be.revertedWith(
        "Not your wand"
      );
    });

    it("reverts if the wand is already at or above that level", async function () {
      const { forge, wandTokenId, wandHolder } = await baseSetup();

      await forge.adjustXp(wandHolder.address, 128);

      await expect(
        forge.connect(wandHolder).levelUp(wandTokenId, 0)
      ).to.be.revertedWith("Already at or above that level");
    });

    it("reverts if the level is higher than the maximum level", async function () {
      const { forge, wandTokenId, wandHolder } = await baseSetup();

      await forge.adjustXp(wandHolder.address, 10000000);

      await expect(
        forge.connect(wandHolder).levelUp(wandTokenId, 5)
      ).to.be.revertedWith("Level out of bounds");
    });

    it("reverts if the account does not have enough unspent XP", async function () {
      const { forge, wandTokenId, wandHolder } = await baseSetup();

      const totalCost =
        (await forge.levelUpCost(0)) + (await forge.levelUpCost(1));

      await forge.adjustXp(wandHolder.address, totalCost - 1);
      await forge.connect(wandHolder).levelUp(wandTokenId, 1);

      await expect(
        forge.connect(wandHolder).levelUp(wandTokenId, 2)
      ).to.be.revertedWith("Not enough XP to spend");
    });

    it("updates the spent XP", async function () {
      const { forge, wandTokenId, wandHolder } = await baseSetup();

      const cost = await forge.levelUpCost(0);
      const xpAccrued = cost;

      await forge.adjustXp(wandHolder.address, xpAccrued);
      await forge.connect(wandHolder).levelUp(wandTokenId, 1);

      expect(await forge.level(wandTokenId)).to.equal(1);
      expect(await forge.xpSpent(wandHolder.address)).to.equal(cost);
      expect(await forge.xp(wandHolder.address)).to.equal(xpAccrued);
    });

    it("can upgrade over multiple levels", async function () {
      const { forge, wandTokenId, wandHolder } = await baseSetup();

      const totalCost =
        (await forge.levelUpCost(0)) + (await forge.levelUpCost(1));

      const accruedXp = totalCost + 500;

      await forge.adjustXp(wandHolder.address, accruedXp);
      await forge.connect(wandHolder).levelUp(wandTokenId, 2);

      expect(await forge.level(wandTokenId)).to.equal(2);
      expect(await forge.xpSpent(wandHolder.address)).to.equal(totalCost);
      expect(await forge.xp(wandHolder.address)).to.equal(accruedXp);
    });

    it.skip('emits a "LeveledUp" event for each level', async function () {
      const { forge, wandTokenId, wandHolder } = await baseSetup();

      await forge.adjustXp(wandHolder.address, 500);
      const tx = await forge.connect(wandHolder).levelUp(wandTokenId, 2);
      const receipt = await tx.wait();

      const events =
        receipt.events?.filter((e) => e.event === "LeveledUp") || [];
      expect(events).to.have.length(2);
      expect(events[0].args?.level).to.equal(1);
      expect(events[1].args?.level).to.equal(2);
    });
  });
});

let tokenId = 0;
const mintWand = async (
  zodiacWands: ZodiacWands,
  minter: Signer,
  permit: {
    proof: string[];
    signature: string;
  }
) => {
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
  };
  const date = new Date("2022-10-01");

  const tx = await zodiacWands
    .connect(minter)
    .mint(...packForMinting(state, date), permit);
  await tx.wait();

  return tokenId++;
};
