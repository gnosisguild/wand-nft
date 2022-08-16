// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "../interfaces/Types.sol";
import "../Cauldron.sol";

contract TestPacker {
  function packPlanets(Planet[8] memory planets)
    public
    pure
    returns (uint128 packedPlanets, uint8 packedVisibility)
  {
    for (uint256 i = 0; i < 8; i++) {
      uint128 a = uint128(uint8(planets[i].x));
      uint128 b = uint128(uint8(planets[i].y)) << 8;
      // converting the right side of the shift was compiler warning -> ???
      packedPlanets |= (a | b) << uint128(16 * i);
      packedVisibility |= (planets[i].visible ? 1 : 0) << uint8(i);
    }
  }

  function packAspects(Aspect[8] memory aspects)
    public
    pure
    returns (uint256 packedAspects)
  {
    for (uint256 i = 0; i < 8; i++) {
      Aspect memory aspect = aspects[i];
      uint256 a = uint256(uint8(aspect.x1));
      uint256 b = uint256(uint8(aspect.y1)) << 8;
      uint256 c = uint256(uint8(aspect.x2)) << 16;
      uint256 d = uint256(uint8(aspect.y2)) << 24;
      packedAspects |= (a | b | c | d) << (i * 32);
    }
  }

  function packBackground(Cauldron.Background memory background)
    public
    pure
    returns (uint64 packedBackground)
  {
    // 1 bit
    packedBackground |= (background.radial ? 1 : 0);
    // 1 bit
    packedBackground |= (background.dark ? 1 : 0) << 1;
    // 8 bits
    packedBackground |= uint64(background.color.saturation) << 2;
    // 8 bits
    packedBackground |= uint64(background.color.lightness) << 10;
    // 16 bits
    packedBackground |= uint64(background.color.hue) << 18;
  }

  function packHalo(Cauldron.Halo memory halo)
    public
    pure
    returns (uint16 packedHalo)
  {
    uint8 shape;
    if (halo.halo0) {
      shape = 0;
    } else if (halo.halo1) {
      shape = 1;
    } else if (halo.halo2) {
      shape = 2;
    } else if (halo.halo3) {
      shape = 3;
    } else if (halo.halo4) {
      shape = 4;
    } else if (halo.halo5) {
      shape = 5;
    }
    uint16 rhythm;
    for (uint256 i = 0; i < 13; i++) {
      rhythm |= uint16((halo.rhythm[i] ? 1 : 0)) << uint16(i);
    }

    return (rhythm << 3) | shape;
  }

  function packHandle(Cauldron.Handle memory handle)
    public
    pure
    returns (uint8 packedHandle)
  {
    if (handle.handle0) {
      packedHandle = uint8(0);
    } else if (handle.handle1) {
      packedHandle = uint8(1);
    } else if (handle.handle2) {
      packedHandle = uint8(2);
    } else if (handle.handle3) {
      packedHandle = uint8(3);
    }
  }
}
