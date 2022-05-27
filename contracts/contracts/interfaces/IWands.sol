// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "../svg/Template.sol";

interface IWands is IERC721 {
  struct Wand {
    bool built;
    uint256 evolution;
    uint256 birth;
    uint8 halo;
    int16 latitude;
    int16 longitude;
    Template.Planet[] planets;
    Template.Aspect[] aspects;
  }

  function build(
    uint256 tokenId,
    uint8 halo,
    int16 latitude,
    int16 longitude,
    Template.Planet[8] memory planets,
    Template.Aspect[8] memory aspects
  ) external;

  function wands(uint256 tokenId)
    external
    view
    returns (
      uint8 halo,
      uint256 evolution,
      uint256 birth
    );
}
