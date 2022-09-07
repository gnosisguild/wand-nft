import { expect } from "chai";
import hre, { deployments, ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";

import { MerkleTree } from "merkletreejs";
import { keccak256 } from "ethers/lib/utils";
import { BigNumber, Signer, Wallet } from "ethers";

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

      const permit = await getPermit(signerIndex, minterIndex);

      await expect(gatedMint.connect(signer)._preMint(permit)).to.not.be
        .reverted;
    });

    it("reverts for a permit produced for a different minter", async function () {
      const { gatedMint } = await baseSetup();

      const signerIndex = 0;
      const minterIndex = 0;
      const wrongMinterIndex = 1;

      const signer = (await hre.ethers.getSigners())[wrongMinterIndex];

      const permit = await getPermit(signerIndex, minterIndex);

      await expect(
        gatedMint.connect(signer)._preMint(permit)
      ).to.be.revertedWith("Mint permit invalid signature");
    });

    it("reverts for an already used proof", async function () {
      const { gatedMint } = await baseSetup();

      const signerIndex = 0;
      const minterIndex = 0;

      const signer = (await hre.ethers.getSigners())[minterIndex];

      const permit = await getPermit(signerIndex, minterIndex);

      await expect(gatedMint.connect(signer)._preMint(permit)).to.not.be
        .reverted;

      await expect(
        gatedMint.connect(signer)._preMint(permit)
      ).to.be.revertedWith("Mint permit already used");
    });
  });
});

function getPermitSigners() {
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

async function getPermit(from: number, to: number) {
  const permitSigners = getPermitSigners();
  const elements = await Promise.all(permitSigners.map((s) => s.getAddress()));
  const merkleTree = new MerkleTree(elements, keccak256, {
    hashLeaves: true,
    sortPairs: true,
  });

  const permitSigner = permitSigners[from] as Signer;
  const permitSignerAddress = await permitSigner.getAddress();

  const minterSigner = (await hre.ethers.getSigners())[to];
  const minterAddress = await minterSigner.getAddress();

  // not we have to arrayify because wallet.signMessage does not recognize hex strings
  const messageHash = ethers.utils.arrayify(keccak256(minterAddress));
  const signature = await permitSigner.signMessage(messageHash);

  expect(ethers.utils.verifyMessage(messageHash, signature)).to.eq(
    permitSignerAddress
  );

  return {
    signature,
    signer: permitSignerAddress,
    proof: merkleTree.getHexProof(keccak256(permitSignerAddress)),
  };
}
