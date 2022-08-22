import { getAddress, Interface } from "ethers/lib/utils";

const abi = [
  "function mint(uint16 stone, uint16 halo, uint8 handle, uint64 background, uint128 planets, uint256 aspects, uint8 visibility) returns (uint256)",
  "function tokenURI(uint256 tokenId) view returns (string)",
];

const wandContract = {
  address: getAddress("0xcE24ee2DD0da71cB652c62a0F93eF2Da6607f72F"),
  abi: new Interface(abi).format("json"),
};

export default wandContract;
