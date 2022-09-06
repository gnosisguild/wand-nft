import { getAddress, Interface } from "ethers/lib/utils";

const abi = [
  "function mint(uint16 stone, uint16 halo, uint8 handle, uint64 background, uint128 planets, uint256 aspects, uint8 visibility, bytes32[] proof) returns (uint256)",
  "function tokenURI(uint256 tokenId) view returns (string)",
];

const wandContract = {
  address: getAddress("0x06f3Ff7c01A45E7f48696856b06119CD07f7ce4e"),
  abi: new Interface(abi).format("json"),
};

export default wandContract;
