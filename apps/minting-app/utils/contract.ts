import { getAddress, Interface } from "ethers/lib/utils";

const abi = [
  "function mint(uint16 stone, uint16 halo, uint8 handle, uint64 background, uint128 planets, uint256 aspects, uint8 visibility, tuple(bytes signature, bytes32[] proof) permit) returns (uint256)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function redemptions(address) view returns (bool)",
];

const wandContract = {
  address: getAddress("0xBe41D6b67D1796A7196f08f43165724E196C15F1"),
  abi: new Interface(abi).format("json"),
  chainId: 5,
};

export default wandContract;
