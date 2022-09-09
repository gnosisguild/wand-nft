import { ethers } from "ethers";
import { keccak256 } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

type Greenlist = {
  root: string;
  proofs: { leaf: string; proof: string[] }[];
};

type MintPermit = {
  signature: string;
  proof: string[];
};

const useMintPermit = (phrase: string) => {
  const { address } = useAccount();
  const [greenlist, setGreenlist] = useState<Greenlist | null>(null);
  const [permit, setPermit] = useState<MintPermit | null>(null);

  useEffect(() => {
    console.log("running");
    fetch(`/api/greenlist`, {
      headers: new Headers({ "content-type": "application/json" }),
    })
      .then((response) => response.json())
      .then((greenlist) => {
        setGreenlist(greenlist);
      });
  }, []);

  useEffect(() => {
    // a bit scruffy will beautify
    const updatePermit = async () => {
      if (!greenlist || !address) {
        setPermit(null);
        return;
      }

      const minter = address;

      if (phrase) {
        const signer = signerFromPhrase(phrase);
        const leaf = keccak256(signer.address);

        const hit = greenlist.proofs.find((proof) => proof.leaf == leaf);

        if (hit) {
          const messageHash = ethers.utils.arrayify(keccak256(minter));
          const signature = await signer.signMessage(messageHash);
          setPermit({ signature, proof: hit.proof });
        } else {
          setPermit(null);
        }
      } else {
        const leaf = keccak256(minter);
        const hit = greenlist.proofs.find((proof) => proof.leaf == leaf);

        if (hit) {
          setPermit({ signature: "0x", proof: hit.proof });
        } else {
          setPermit(null);
        }
      }
    };

    updatePermit();
  }, [address, phrase, greenlist]);

  return permit;
};

function signerFromPhrase(phrase: string) {
  return new ethers.Wallet(
    ethers.utils.keccak256(ethers.utils.toUtf8Bytes(phrase))
  );
}

export default useMintPermit;
