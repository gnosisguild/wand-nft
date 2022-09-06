import { getAddress, Interface } from "ethers/lib/utils";

const abi = [
  "function mint(uint16 stone, uint16 halo, uint8 handle, uint64 background, uint128 planets, uint256 aspects, uint8 visibility, bytes32[] proof) returns (uint256)",
  "function tokenURI(uint256 tokenId) view returns (string)",
];

const wandContract = {
  address: getAddress("0x1FCBD28c3efBc43ca08C75AC489171b9aEfa965B"),
  abi: new Interface(abi).format("json"),
};

export default wandContract;
