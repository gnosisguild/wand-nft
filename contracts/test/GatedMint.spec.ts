import { expect } from "chai";
import hre, { deployments, ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";

import { MerkleTree } from "merkletreejs";
import { keccak256 } from "ethers/lib/utils";
import { Wallet } from "ethers";

describe("GatedMint", async () => {
  const baseSetup = deployments.createFixture(async () => {
    await deployments.fixture();

    const [signer] = await hre.ethers.getSigners();

    const elements = [
      signer.address,
      ...WILDCARD_ISSUERS.map(({ address }) => address),
    ];
    const merkleTree = new MerkleTree(elements, keccak256, {
      hashLeaves: true,
      sortPairs: true,
    });

    const GatedMintMock = await hre.ethers.getContractFactory("GatedMintMock");
    const gatedMint = await GatedMintMock.deploy(merkleTree.getHexRoot());

    return { merkleTree, gatedMint };
  });

  describe("redeem", function () {
    it("redeems for a valid wildcard permit", async function () {
      const { gatedMint, merkleTree } = await baseSetup();

      const issuerIndex = 0;
      const minterIndex = 0;

      const issuer = WILDCARD_ISSUERS[issuerIndex];
      const minter = (await hre.ethers.getSigners())[minterIndex];

      const permit = {
        signature: await getSignature(issuer, minter.address),
        proof: merkleTree.getHexProof(keccak256(issuer.address)),
      };

      await expect(gatedMint.connect(minter)._redeem(permit)).to.not.be
        .reverted;
    });

    it("reverts for an already used wildcard permit", async function () {
      const { gatedMint, merkleTree } = await baseSetup();

      const issuerIndex = 0;
      const minterIndex = 0;

      const issuer = WILDCARD_ISSUERS[issuerIndex];

      const minter = (await hre.ethers.getSigners())[minterIndex];
      const permit = {
        proof: merkleTree.getHexProof(keccak256(issuer.address)),
        signature: getSignature(issuer, minter.address),
      };

      await expect(gatedMint.connect(minter)._redeem(permit)).to.not.be
        .reverted;

      await expect(
        gatedMint.connect(minter)._redeem(permit)
      ).to.be.revertedWith("MintPermit: Already used");
    });

    it("reverts for an invalid wildcard permit", async function () {
      const { gatedMint, merkleTree } = await baseSetup();
      const issuerIndex = 0;
      const minterIndex = 0;
      const wrongMinterIndex = 1;

      const signers = await hre.ethers.getSigners();

      const minter = signers[minterIndex];
      const wrongMinter = signers[wrongMinterIndex];
      const issuer = WILDCARD_ISSUERS[issuerIndex];

      const permit1 = {
        signature: getSignature(issuer, minter.address),
        proof: merkleTree.getProof(issuer.address),
      };
      await expect(
        gatedMint.connect(wrongMinter)._redeem(permit1)
      ).to.be.revertedWith("MintPermit: Not authorized");

      const permit2 = {
        signature: getSignature(issuer, wrongMinter.address),
        proof: merkleTree.getProof(issuer.address),
      };
      await expect(
        gatedMint.connect(minter)._redeem(permit2)
      ).to.be.revertedWith("MintPermit: Not authorized");
    });

    it("redeems for a valid direct permit", async function () {
      const [signer] = await hre.ethers.getSigners();
      const { gatedMint, merkleTree } = await baseSetup();

      const permit = {
        signature: "0x",
        proof: merkleTree.getHexProof(keccak256(signer.address)),
      };

      await expect(gatedMint.connect(signer)._redeem(permit)).to.not.be
        .reverted;
    });

    it("reverts for a invalid direct permit", async function () {
      const [forProof, minter] = await hre.ethers.getSigners();
      const { gatedMint, merkleTree } = await baseSetup();

      const permit = {
        signature: "0x",
        proof: merkleTree.getHexProof(keccak256(forProof.address)),
      };

      await expect(
        gatedMint.connect(minter)._redeem(permit)
      ).to.be.revertedWith("MintPermit: Not authorized");
    });
  });
});

const WILDCARD_ISSUERS = [
  "double custom typical style harvest buzz",
  "wasp decorate badge coast park pole",
  "sense pudding cause leave security subway",
]
  .map((password) => ethers.utils.keccak256(ethers.utils.toUtf8Bytes(password)))
  .map((pk) => new ethers.Wallet(pk));

async function getSignature(issuer: Wallet, minter: string) {
  const messageHash = ethers.utils.arrayify(keccak256(minter));
  return issuer.signMessage(messageHash);
}
