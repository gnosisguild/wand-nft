import assert from "assert";
import { ethers, Signer } from "ethers";
import MerkleTree from "merkletreejs";
import hre from "hardhat";
import { keccak256 } from "../src/tasks/proofdb";

export function getPermitSigners() {
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

export async function getPermit(from: number, to: number) {
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

  assert(
    ethers.utils.verifyMessage(messageHash, signature) == permitSignerAddress
  );

  return {
    signature,
    issuer: permitSignerAddress,
    proof: merkleTree.getHexProof(keccak256(permitSignerAddress)),
  };
}
