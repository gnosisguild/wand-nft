import { getAddress, Interface } from "ethers/lib/utils";

const abi = [
  "function mint(uint16 stone, uint16 halo, uint8 handle, uint64 background, uint128 planets, uint256 aspects, uint8 visibility, tuple(bytes signature, bytes32[] proof) permit) returns (uint256)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function redemptions(address) view returns (bool)",
];

const wandContract = {
  address: getAddress("0x892b4FA73F16f08024c40CF8E7810F0d608e21aa"),
  abi: new Interface(abi).format("json"),
  chainId: 11155111,
};

export default wandContract;
