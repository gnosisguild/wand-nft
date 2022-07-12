// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../svg/Template.sol";

interface IWands is IERC721 {
  struct Aspect {
    int8 x1;
    int8 y1;
    int8 x2;
    int8 y2;
  }

  struct Planet {
    bool visible;
    int8 x;
    int8 y;
  }

  struct Background {
    bool radial;
    bool dark;
    Template.Color color;
  }

  struct Wand {
    bool built;
    uint8 stone;
    uint8 handle;
    uint16 halo;
    Background background;
    Planet[8] planets;
    Aspect[8] aspects;
    uint256 seed;
    uint256 evolution;
    uint256 birth;
  }

  function build(
    uint256 tokenId,
    uint8 stone,
    uint8 handle,
    uint16 halo,
    Background memory background,
    Planet[8] memory planets,
    Aspect[8] memory aspects
  ) external;

  function wands(uint256 tokenId)
    external
    view
    returns (
      uint16 halo,
      uint256 evolution,
      uint256 birth
    );
}
