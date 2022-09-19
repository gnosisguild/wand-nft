import { useContractRead } from "wagmi";
import wandContract from "../utils/contract";

export function useHasMinted(issuer: string | undefined): boolean {
  const { data } = useContractRead({
    addressOrName: wandContract.address,
    contractInterface: wandContract.abi,
    functionName: "redemptions",
    args: [issuer],
  });

  return !!data;
}
