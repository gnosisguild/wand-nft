import { constants } from "ethers";
import { keccak256 } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const useSeed = () => {
  const [mounted, setMounted] = useState(false);
  const { address } = useAccount();
  useEffect(() => {
    setMounted(true);
  }, []);

  // We use ZeroAdress on server and first render on client, so the results match
  // Then we switch to using the actual address on client
  const finalAddress = (mounted && address) || constants.AddressZero;
  return parseInt(keccak256(finalAddress).slice(-4), 16);
};

export default useSeed;
