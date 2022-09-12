import { ethers } from "ethers";
import { computeAddress, keccak256, SigningKey } from "ethers/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";

type Greenlist = {
  root: string;
  proofs: { leaf: string; proof: string[] }[];
};

type MintPermit = {
  signature: string;
  proof: string[];
};

const useMintPermit = (phrase: string): MintPermit | null => {
  const { address: minter } = useAccount();
  const [greenlist, setGreenlist] = useState<Greenlist | null>(null);

  useEffect(() => {
    fetch(`/api/greenlist`, {
      headers: new Headers({ "content-type": "application/json" }),
    })
      .then((response) => response.json())
      .then((greenlist) => {
        setGreenlist(greenlist);
      });
  }, []);

  const permit = useMemo(() => {
    if (!greenlist || !minter) {
      return null;
    }

    const directProof = proof(greenlist, minter);
    if (directProof) {
      return { proof: directProof, signature: "0x" };
    }

    const { signingKey, issuer } = createSigningKey(phrase);
    const wildcardProof = proof(greenlist, issuer);
    if (wildcardProof) {
      return { proof: wildcardProof, signature: sign(signingKey, minter) };
    }

    return null;
  }, [minter, phrase, greenlist]);

  return permit;
};

function proof(greenlist: Greenlist, address: string) {
  const leaf = keccak256(address);
  return greenlist.proofs.find((proof) => proof.leaf == leaf)?.proof || null;
}

function sign(sk: SigningKey, minter: string) {
  const message = ethers.utils.arrayify(keccak256(minter));
  return ethers.utils.joinSignature(
    sk.signDigest(ethers.utils.hashMessage(message))
  );
}

function createSigningKey(phrase: string) {
  const signingKey = new SigningKey(
    ethers.utils.keccak256(ethers.utils.toUtf8Bytes(phrase))
  );

  return { signingKey, issuer: computeAddress(signingKey.publicKey) };
}

export default useMintPermit;
