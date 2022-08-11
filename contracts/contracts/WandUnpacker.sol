// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "./interfaces/Types.sol";
import "./Cauldron.sol";


// Note this library gets inlined because all methods are internal.
// changing any of the methods from internal will require tooling adjustments

library WandUnpacker {
  function unpack(uint256 tokenId, PackedWand memory packedWand)
    internal
    pure
    returns (Wand memory)
  {
    Cauldron.Background memory background = unpackBackground(
      packedWand.background
    );
    Cauldron.Halo memory halo = unpackHalo(packedWand.halo);
    halo.hue = (background.color.hue + 180) % 360;

    return
      Wand({
        tokenId: tokenId,
        stone: packedWand.stone,
        halo: halo,
        birth: packedWand.birth,
        handle: unpackHandle(packedWand.handle),
        background: background,
        planets: unpackPlanets(packedWand.planets, packedWand.visibility),
        aspects: unpackAspects(packedWand.aspects),
        xp: 0,
        level: 0
      });
  }

  function unpackPlanets(uint128 packedPlanets, uint8 packedVisibility)
    internal
    pure
    returns (Planet[8] memory planets)
  {
    for (uint256 i = 0; i < 8; i++) {
      uint256 chunk = packedPlanets >> (16 * i);
      int8 x = int8(uint8(chunk));
      int8 y = int8(uint8(chunk >> 8));
      bool visible = packedVisibility & (1 << i) != 0;

      planets[i] = Planet({x: x, y: y, visible: visible});
    }
  }

  function unpackAspects(uint256 packedAspects)
    internal
    pure
    returns (Aspect[8] memory aspects)
  {
    for (uint256 i = 0; i < 8; i++) {
      uint256 chunk = packedAspects >> (i * 32);
      int8 x1 = int8(uint8(chunk));
      int8 y1 = int8(uint8(chunk >> 8));
      int8 x2 = int8(uint8(chunk >> 16));
      int8 y2 = int8(uint8(chunk >> 24));
      aspects[i] = Aspect({x1: x1, y1: y1, x2: x2, y2: y2});
    }
  }

  function unpackBackground(uint64 packedBackground)
    internal
    pure
    returns (Cauldron.Background memory background)
  {
    background.radial = (packedBackground & 0x0001) != 0;
    background.dark = (packedBackground & 0x0002) != 0;
    background.color.saturation = uint8(packedBackground >> 2);
    background.color.lightness = uint8(packedBackground >> 10);
    background.color.hue = uint16(packedBackground >> 18);
  }

  function unpackHalo(uint16 packedHalo)
    internal
    pure
    returns (Cauldron.Halo memory halo)
  {
    bool[24] memory rhythm;
    for (uint256 i = 0; i < 24; i++) {
      uint256 bit = i > 12 ? 24 - i : i;
      rhythm[i] = ((1 << bit) & (packedHalo >> 3)) != 0;
    }
    uint8 shape = uint8(packedHalo) & 0x07;

    return
      Cauldron.Halo({
        halo0: shape == 0,
        halo1: shape == 1,
        halo2: shape == 2,
        halo3: shape == 3,
        halo4: shape == 4,
        halo5: shape == 5,
        hue: 0, //(wand.background.color.hue + 180) % 360,
        rhythm: rhythm
      });
  }

  function unpackHandle(uint8 packedHandle)
    internal
    pure
    returns (Cauldron.Handle memory handle)
  {
    return
      Cauldron.Handle({
        handle0: packedHandle == 0,
        handle1: packedHandle == 1,
        handle2: packedHandle == 2,
        handle3: packedHandle == 3
      });
  }
}
