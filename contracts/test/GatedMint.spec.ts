import { expect } from "chai";
import hre, { deployments } from "hardhat";
import "@nomiclabs/hardhat-ethers";

import { MerkleTree } from "merkletreejs";
import { keccak256 } from "ethers/lib/utils";

describe("GatedMint", async () => {
  const baseSetup = deployments.createFixture(async () => {
    await deployments.fixture();

    const signers = await hre.ethers.getSigners();
    const elements = await Promise.all(signers.map((s) => s.getAddress()));
    const merkleTree = new MerkleTree(elements, keccak256, {
      hashLeaves: true,
      sortPairs: true,
    });

    const root = merkleTree.getHexRoot();
    const GatedMintMock = await hre.ethers.getContractFactory("GatedMintMock");
    const gatedMint = await GatedMintMock.deploy(root);

    const proofs = elements.map((e) => merkleTree.getHexProof(keccak256(e)));

    return { gatedMint, proofs };
  });

  describe("preMint", function () {
    it("it executes for a valid proof", async function () {
      const { gatedMint, proofs } = await baseSetup();

      const signerIndex = 3;
      const proofIndex = 3;
      const signers = await hre.ethers.getSigners();

      const signer = signers[signerIndex];
      const proof = proofs[proofIndex];

      await expect(gatedMint.connect(signer)._preMint(proof)).to.not.be
        .reverted;
    });

    it("reverts for a valid proof but wrong leaf", async function () {
      const { gatedMint, proofs } = await baseSetup();

      const signerIndex = 3;
      const proofIndex = 4;
      const signers = await hre.ethers.getSigners();

      const signer = signers[signerIndex];
      const proof = proofs[proofIndex];

      await expect(
        gatedMint.connect(signer)._preMint(proof)
      ).to.be.reverted.revertedWith("Invalid mint permit");
    });

    it("reverts for an already used proof", async function () {
      const { gatedMint, proofs } = await baseSetup();

      const signerIndex = 3;
      const proofIndex = 3;
      const signers = await hre.ethers.getSigners();

      const signer = signers[signerIndex];
      const proof = proofs[proofIndex];

      await expect(gatedMint.connect(signer)._preMint(proof)).to.not.be
        .reverted;

      await expect(
        gatedMint.connect(signer)._preMint(proof)
      ).to.be.revertedWith("Mint permit already used");
    });
  });
});
