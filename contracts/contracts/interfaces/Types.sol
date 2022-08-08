// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "../Template.sol";

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
  uint256 tokenId;
  uint64 birth;
  uint16 stone;
  Template.Halo halo;
  Template.Handle handle;
  Template.Background background;
  Planet[8] planets;
  Aspect[8] aspects;
  uint32 xp;
  uint32 level;
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
