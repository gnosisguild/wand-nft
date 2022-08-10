import { ethers } from "ethers";
import { getAddress } from "ethers/lib/utils";

const abi = [
  "function mint(uint16 stone, uint16 halo, uint8 handle, uint64 background, uint128 planets, uint256 aspects, uint8 visibility) returns (uint256)",
  "function tokenURI(uint256 tokenId) returns (string)",
];

const wandContract = {
  address: getAddress("0x7809b71FC3521eD81C1071E8DE98d5D37FaB1497"),
  abi,
  iface: new ethers.utils.Interface(abi),
};

export default wandContract;
