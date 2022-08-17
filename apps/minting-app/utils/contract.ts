import { getAddress, Interface } from "ethers/lib/utils";

const abi = [
  "function mint(uint16 stone, uint16 halo, uint8 handle, uint64 background, uint128 planets, uint256 aspects, uint8 visibility) returns (uint256)",
  "function tokenURI(uint256 tokenId) view returns (string)",
];

const wandContract = {
  address: getAddress("0xBCe0d208E48B8B1d1fb8b7Efdfd648fe462dc848"),
  abi: new Interface(abi).format("json"),
};

export default wandContract;
