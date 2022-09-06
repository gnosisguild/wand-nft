import assert from "assert";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const useMerkleProof = () => {
  const { address } = useAccount();
  const [merkleProof, setMerkleProof] = useState<string[]>([]);

  useEffect(() => {
    // a bit scruffy will rewrite
    if (ethers.utils.isAddress(address || "")) {
      fetch(`/api/proof`, {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify(address),
      })
        .then((response: Response) => {
          return response.json();
        })
        .then((body) => {
          assert(
            body !== null &&
              Array.isArray(body) &&
              body.every((t) => typeof t === "string"),
            "bad response"
          );

          setMerkleProof(body);
        });
    }
  }, [address]);

  return merkleProof;
};

export default useMerkleProof;
