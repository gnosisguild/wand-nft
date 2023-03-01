import { getAddress, Interface } from "ethers/lib/utils";

const abi = [
  "function mint(uint16 stone, uint16 halo, uint8 handle, uint64 background, uint128 planets, uint256 aspects, uint8 visibility, tuple(bytes signature, bytes32[] proof) permit) returns (uint256)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function redemptions(address) view returns (bool)",
];

const wandContract = {
  address: getAddress("0x358485F29a2415f53ad8410789743Ba0Fb4Aa0c6"),
  abi: new Interface(abi).format("json"),
  chainId: 5,
};

export default wandContract;
