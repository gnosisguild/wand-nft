import { expect } from "chai";
import hre, { deployments, ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";

import { MerkleTree } from "merkletreejs";
import { keccak256 } from "ethers/lib/utils";
import assert from "assert";

describe("GatedMint", async () => {
  const baseSetup = deployments.createFixture(async () => {
    await deployments.fixture();

    const permitSigners = getIssuers();

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

  describe("redeem", function () {
    it("it executes for a valid permit", async function () {
      const { gatedMint } = await baseSetup();

      const issuerIndex = 0;
      const minterIndex = 0;

      const signer = (await hre.ethers.getSigners())[minterIndex];

      const permit = await getWildcardPermit(issuerIndex, minterIndex);

      await expect(gatedMint.connect(signer)._redeem(permit)).to.not.be
        .reverted;
    });

    it("reverts for a permit produced for a different minter", async function () {
      const { gatedMint } = await baseSetup();

      const issuerIndex = 0;
      const minterIndex = 0;
      const wrongMinterIndex = 1;

      const signer = (await hre.ethers.getSigners())[wrongMinterIndex];

      const permit = await getWildcardPermit(issuerIndex, minterIndex);

      await expect(
        gatedMint.connect(signer)._redeem(permit)
      ).to.be.revertedWith("MintPermit: Not authorized");
    });

    it("reverts for an already used proof", async function () {
      const { gatedMint } = await baseSetup();

      const issuerIndex = 0;
      const minterIndex = 0;

      const signer = (await hre.ethers.getSigners())[minterIndex];
      const permit = await getWildcardPermit(issuerIndex, minterIndex);

      await expect(gatedMint.connect(signer)._redeem(permit)).to.not.be
        .reverted;

      await expect(
        gatedMint.connect(signer)._redeem(permit)
      ).to.be.revertedWith("MintPermit: Already used");
    });
  });
});

function getIssuers() {
  const passwords = [
    "double custom typical style harvest buzz",
    "wasp decorate badge coast park pole",
    "sense pudding cause leave security subway",
  ];

  return passwords
    .map((password) =>
      ethers.utils.keccak256(ethers.utils.toUtf8Bytes(password))
    )
    .map((pk) => new ethers.Wallet(pk));
}

async function getWildcardPermit(from: number, to: number) {
  const elements = getIssuers().map((s) => s.address);
  const merkleTree = new MerkleTree(elements, keccak256, {
    hashLeaves: true,
    sortPairs: true,
  });

  const issuer = getIssuers()[from];

  const minter = (await hre.ethers.getSigners())[to];

  // not we have to arrayify because wallet.signMessage does not recognize hex strings
  const messageHash = ethers.utils.arrayify(keccak256(minter.address));
  const signature = await issuer.signMessage(messageHash);

  assert(ethers.utils.verifyMessage(messageHash, signature) == issuer.address);

  return {
    signature,
    proof: merkleTree.getHexProof(keccak256(issuer.address)),
  };
}
