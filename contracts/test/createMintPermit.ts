import assert from "assert";
import { ethers, Signer } from "ethers";
import MerkleTree from "merkletreejs";
import hre from "hardhat";
import { keccak256 } from "ethers/lib/utils";

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

export async function getWildcardPermit(from: number, to: number) {
  const permitSigners = getPermitSigners();
  const elements = await Promise.all(permitSigners.map((s) => s.getAddress()));
  const merkleTree = new MerkleTree(elements, keccak256, {
    hashLeaves: true,
    sortPairs: true,
  });

  const issuerSigner = permitSigners[from] as Signer;
  const issuer = await issuerSigner.getAddress();

  const minterSigner = (await hre.ethers.getSigners())[to];
  const minter = await minterSigner.getAddress();

  // not we have to arrayify because wallet.signMessage does not recognize hex strings
  const messageHash = ethers.utils.arrayify(keccak256(minter));
  const signature = await issuerSigner.signMessage(messageHash);

  assert(ethers.utils.verifyMessage(messageHash, signature) == issuer);

  return {
    signature,
    proof: merkleTree.getHexProof(keccak256(issuer)),
  };
}
