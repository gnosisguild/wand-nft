// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./Types.sol";

interface IZodiacWands is IERC721 {
  function mint(
    uint16 stone,
    uint16 halo,
    uint8 handle,
    uint64 background,
    uint128 planets,
    uint256 aspects,
    uint8 visibility
  ) external returns (uint256);
}
