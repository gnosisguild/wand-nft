import { getAddress, Interface } from "ethers/lib/utils";

const abi = [
  "function mint(uint16 stone, uint16 halo, uint8 handle, uint64 background, uint128 planets, uint256 aspects, uint8 visibility, bytes32[] proof) returns (uint256)",
  "function tokenURI(uint256 tokenId) view returns (string)",
];

const wandContract = {
  address: getAddress("0x6479ebdF1d08f3a9eC90F786FdA58E5bDAE8D40f"),
  abi: new Interface(abi).format("json"),
};

export default wandContract;
