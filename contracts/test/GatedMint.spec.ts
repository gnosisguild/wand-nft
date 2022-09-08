import { expect } from "chai";
import hre, { deployments } from "hardhat";
import "@nomiclabs/hardhat-ethers";

import { MerkleTree } from "merkletreejs";
import { keccak256 } from "ethers/lib/utils";

import { getWildcardPermit, getPermitSigners } from "./createMintPermit";

describe("GatedMint", async () => {
  const baseSetup = deployments.createFixture(async () => {
    await deployments.fixture();

    const permitSigners = getPermitSigners();

    const elements = await Promise.all(
      permitSigners.map((s) => s.getAddress())
    );
    const merkleTree = new MerkleTree(elements, keccak256, {
      hashLeaves: true,
      sortPairs: true,
    });
    const merkleRoot = merkleTree.getHexRoot();

    const GatedMintMock = await hre.ethers.getContractFactory("GatedMintMock");
    const gatedMint = await GatedMintMock.deploy(merkleRoot);

    return { gatedMint };
  });

  describe("preMint", function () {
    it("it executes for a valid permit", async function () {
      const { gatedMint } = await baseSetup();

      const signerIndex = 0;
      const minterIndex = 0;

      const signer = (await hre.ethers.getSigners())[minterIndex];

      const permit = await getWildcardPermit(signerIndex, minterIndex);

      await expect(gatedMint.connect(signer)._redeem(permit)).to.not.be
        .reverted;
    });

    it("reverts for a permit produced for a different minter", async function () {
      const { gatedMint } = await baseSetup();

      const signerIndex = 0;
      const minterIndex = 0;
      const wrongMinterIndex = 1;

      const signer = (await hre.ethers.getSigners())[wrongMinterIndex];

      const permit = await getWildcardPermit(signerIndex, minterIndex);

      await expect(
        gatedMint.connect(signer)._redeem(permit)
      ).to.be.revertedWith("MintPermit: Not authorized");
    });

    it("reverts for an already used proof", async function () {
      const { gatedMint } = await baseSetup();

      const signerIndex = 0;
      const minterIndex = 0;

      const signer = (await hre.ethers.getSigners())[minterIndex];

      const permit = await getWildcardPermit(signerIndex, minterIndex);

      await expect(gatedMint.connect(signer)._redeem(permit)).to.not.be
        .reverted;

      await expect(
        gatedMint.connect(signer)._redeem(permit)
      ).to.be.revertedWith("MintPermit: Already used");
    });
  });
});
