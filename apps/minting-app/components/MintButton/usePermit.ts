import assert from "assert";
import { ethers } from "ethers";
import {
  computeAddress,
  isAddress,
  keccak256,
  SigningKey,
} from "ethers/lib/utils";
import { useMemo } from "react";
import { useAccount } from "wagmi";
import { Greenlist, useGreenlist } from "../useGreenlist";

export type MintPermit = {
  signature: string;
  proof: string[];
};

export const useDirectPermit = (): MintPermit | null => {
  const { address: minter } = useAccount();
  const greenlist = useGreenlist();

  const permit = useMemo(() => {
    if (!greenlist || !minter || !isAddress(minter)) {
      return null;
    }

    const proof = findProof(greenlist, minter);
    return proof !== null ? { proof, signature: "0x" } : null;
  }, [greenlist, minter]);

  return permit;
};

export const useWildcardPermit = (
  phrase: string
): { permit: MintPermit | null; issuer: string } => {
  const { address: minter } = useAccount();
  const greenlist = useGreenlist();

  const permit = useMemo(() => {
    if (!greenlist || !minter || !isAddress(minter)) {
      return { permit: null, issuer: ethers.constants.AddressZero };
    }

    const { signingKey, address: issuer } = createSigningKey(phrase);
    const proof = findProof(greenlist, issuer);

    return proof !== null
      ? { permit: { proof, signature: sign(signingKey, minter) }, issuer }
      : { permit: null, issuer: ethers.constants.AddressZero };
  }, [greenlist, minter, phrase]);

  return permit;
};

function findProof(greenlist: Greenlist, issuer: string) {
  assert(isAddress(issuer));

  const leaf = keccak256(issuer);
  return greenlist.proofs.find((proof) => proof.leaf == leaf)?.proof || null;
}

function createSigningKey(phrase: string) {
  const signingKey = new SigningKey(
    ethers.utils.keccak256(ethers.utils.toUtf8Bytes(phrase))
  );

  return { signingKey, address: computeAddress(signingKey.publicKey) };
}

function sign(sk: SigningKey, minter: string) {
  const message = ethers.utils.arrayify(keccak256(minter));
  return ethers.utils.joinSignature(
    sk.signDigest(ethers.utils.hashMessage(message))
  );
}
