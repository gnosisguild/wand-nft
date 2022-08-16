import { getAddress, Interface } from "ethers/lib/utils";

const abi = [
  "function mint(uint16 stone, uint16 halo, uint8 handle, uint64 background, uint128 planets, uint256 aspects, uint8 visibility) returns (uint256)",
  "function tokenURI(uint256 tokenId) view returns (string)",
];

const wandContract = {
  address: getAddress("0xd72343835E3CE2d0aEda2F6da4825BfD76E4Ab69"),
  abi: new Interface(abi).format("json"),
};

export default wandContract;
