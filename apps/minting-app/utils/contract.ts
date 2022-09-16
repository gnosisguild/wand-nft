import { getAddress, Interface } from "ethers/lib/utils";

const abi = [
  "function mint(uint16 stone, uint16 halo, uint8 handle, uint64 background, uint128 planets, uint256 aspects, uint8 visibility, tuple(bytes signature, bytes32[] proof) permit) returns (uint256)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function redemptions(address) view returns (bool)",
];

const wandContract = {
  address: getAddress("0xade7102921661aE6DFEC1dF17ab60C6Cd53c95ad"),
  abi: new Interface(abi).format("json"),
};

export default wandContract;
