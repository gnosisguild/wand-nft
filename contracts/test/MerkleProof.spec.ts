import { expect } from "chai";
import hre, { deployments, ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";

import { MerkleTree } from "merkletreejs";

describe.only("MerkleProof", async () => {
  const baseSetup = deployments.createFixture(async () => {
    await deployments.fixture();

    const MerkleProofMock = await hre.ethers.getContractFactory(
      "MerkleProofMock"
    );
    const merkleProof = await MerkleProofMock.deploy();

    return { merkleProof };
  });

  const keccak256 = (input: string) => {
    return ethers.utils.keccak256(
      typeof input === "string" ? ethers.utils.toUtf8Bytes(input) : input
    );
  };

  describe("verify", function () {
    it("returns true for a valid Merkle proof", async function () {
      const { merkleProof } = await baseSetup();
      const elements =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".split(
          ""
        );

      const merkleTree = new MerkleTree(elements, keccak256, {
        hashLeaves: true,
        sortPairs: true,
      });

      const root = merkleTree.getHexRoot();
      const leaf = keccak256(elements[0]);
      const proof = merkleTree.getHexProof(leaf);

      expect(await merkleProof.verify(proof, root, leaf)).to.equal(true);
    });

    it("returns false for an invalid Merkle proof", async function () {
      const { merkleProof } = await baseSetup();
      const correctElements = ["a", "b", "c"];
      const correctMerkleTree = new MerkleTree(correctElements, keccak256, {
        hashLeaves: true,
        sortPairs: true,
      });
      const correctRoot = correctMerkleTree.getHexRoot();
      const correctLeaf = keccak256(correctElements[0]);
      const badElements = ["d", "e", "f"];
      const badMerkleTree = new MerkleTree(badElements);
      const badProof = badMerkleTree.getHexProof(badElements[0]);
      expect(
        await merkleProof.verify(badProof, correctRoot, correctLeaf)
      ).to.equal(false);
    });

    it("returns false for a Merkle proof of invalid length", async function () {
      const { merkleProof } = await baseSetup();
      const elements = ["a", "b", "c"];
      const merkleTree = new MerkleTree(elements, keccak256, {
        hashLeaves: true,
        sortPairs: true,
      });
      const root = merkleTree.getHexRoot();
      const leaf = keccak256(elements[0]);
      const proof = merkleTree.getHexProof(leaf);
      const badProof = proof.slice(0, proof.length - 5);
      expect(await merkleProof.verify(badProof, root, leaf)).to.equal(false);
    });
  });
});
