// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./Types.sol";

interface IZodiacWands is IERC721 {
  function mint(
    uint16 stone,
    Template.Handle memory handle,
    Template.Halo memory halo,
    Template.Background memory background,
    Planet[8] memory planets,
    Aspect[8] memory aspects
  ) external returns (uint256);
}
