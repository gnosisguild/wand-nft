// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../Template.sol";

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

  struct Wand {
    uint16 stone;
    uint16 halo;
    uint64 birth;
    uint8 handle;
    Template.Background background;
    Planet[8] planets;
    Aspect[8] aspects;
  }

  struct PackedWand {
    // order matters !!
    uint64 background;
    uint64 birth;
    uint128 planets;
    uint256 aspects;
    // background
    uint16 stone;
    uint16 halo;
    uint8 visibility;
    uint8 handle;
  }

  function mint(
    uint16 stone,
    uint8 handle,
    uint16 halo,
    Template.Background memory background,
    Planet[8] memory planets,
    Aspect[8] memory aspects
  ) external returns (uint256);
}
