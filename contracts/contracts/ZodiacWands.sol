//      ****           *                 **                                       ***** *    **   ***                                 **
//     *  *************                   **     *                             ******  *  *****    ***                                 **
//    *     **********                    **    ***                           **   *  *     *****   ***                                **
//    *             *                     **     *                           *    *  **     * **      **                               **
//     **          *        ****          **                                     *  ***     *         **                               **      ****
//                *        * ***  *   *** **   ***        ****       ****       **   **     *         **    ****    ***  ****      *** **     * **** *
//               *        *   ****   *********  ***      * ***  *   * ***  *    **   **     *         **   * ***  *  **** **** *  *********  **  ****
//              *        **    **   **   ****    **     *   ****   *   ****     **   **     *         **  *   ****    **   ****  **   ****  ****
//             *         **    **   **    **     **    **    **   **            **   **     *         ** **    **     **    **   **    **     ***
//            *          **    **   **    **     **    **    **   **            **   **     *         ** **    **     **    **   **    **       ***
//           *           **    **   **    **     **    **    **   **             **  **     *         ** **    **     **    **   **    **         ***
//          *            **    **   **    **     **    **    **   **              ** *      *         *  **    **     **    **   **    **    ****  **
//      ****           *  ******    **    **     **    **    **   ***     *        ***      ***      *   **    **     **    **   **    **   * **** *
//     *  *************    ****      *****       *** *  ***** **   *******          ******** ********     ***** **    ***   ***   *****        ****
//    *     **********                ***         ***    ***   **   *****             ****     ****        ***   **    ***   ***   ***
//
//
//                              ...             ...
//                             .*%&*..       .,*&&*.
//                            .*%&&&&&/*,,,*/%&&%&&*.
//               ,         ..,%%&&%%&#/*,.,*/%&&%&&&(,..
//                ,%&%////%%/,,,*/%&%*.     .*&%%/*,,,(%%////#&%,
//                .*%&%&&&(,. .   .,%.,     ,.#,.   . .*#&&%%&&*.
//                .*%&&&&&%,.                         .,%&%&&&&*.                       ‘O most honored Greening Force, You who roots in the Sun;
//               .,##***,**#.     .    .*%,.    ..    ,%**,,**&(,                        You who lights up, in shining serenity, within a wheel
//             .,*&*.            ,.,.,,*//**,.,..            ..*%*,.                     that earthly excellence fails to comprehend.
//        .,*/%&&&#/,   ,   .  .*,/((###%%%#####/,,.      .   ./&&&%(**,.
//        .,/%&%&#%&#*..     .,,//((#%&&&&&%%%%%###,,.     ,.*%&&&%&%&*,.                You are enfolded
//          .,(%&%(*,,..    ,,**//(((##%&&&&&%%%%###,/,    ..,,*(#%&(,.                  in the weaving of divine mysteries.
//           .,%/,.     ,  ,,,**///((####%%&&%&%%%###,,         .,#%,
//            ,%*.         ,,,(((///(((#####%%%%%##%#,,          ,/#,                    You redden like the dawn
//           ,/&%(*,..,  .  ,.**(/////@((((((#####&#*.,     ...,*#&%*,                   and you burn: flame of the Sun.”
//         .*&&%&#%&&(,.     ,.*////////&/(/((((#%%*.,     .,%%%&&%&&#*.
//       /((%%&&&&&/,         .,.*(((((///(((#(#(*.,,        .*/%&&&&&%##,               –  Hildegard von Bingen, Causae et Curae
//            .,*%%*.,.          ,,.,*(((((((*,.,,          . .*&#*..
//               .*%*,.....*.        ,,*/%#*,    ,    .......,*%*.
//                .*&%&%%(,.         .,*,(/(,,         .,%&&&&%*.
//                .*&&&*,           ..,*(#//, .    .     .,/#%%,.
//                .#/,.       .       .**#/*.       .       .,%*.
//                                    .**#/,.              .
//                                    .,./*,,

// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IZodiacWands.sol";
import "./interfaces/IForge.sol";
import "./interfaces/IConjuror.sol";

contract ZodiacWands is IZodiacWands, ERC721, Ownable {
  IForge public forge;
  IConjuror public conjuror;

  uint256 internal nextTokenId;
  mapping(uint256 => PackedWand) internal wands;

  event WandBuilt(
    uint256 indexed tokenId,
    uint16 stone,
    Template.Handle handle,
    Template.Halo halo,
    Template.Background background,
    Planet[8] planets,
    Aspect[8] aspects
  );

  constructor(IConjuror _conjuror) ERC721("ZodiacWands", "WAND") {
    conjuror = _conjuror;
  }

  function mint(
    uint16 stone,
    Template.Handle memory handle,
    Template.Halo memory halo,
    Template.Background memory background,
    Planet[8] memory planets,
    Aspect[8] memory aspects
  ) external override returns (uint256) {
    uint256 tokenId = nextTokenId++;
    _safeMint(msg.sender, tokenId);

    wands[tokenId] = pack(
      uint64(block.timestamp),
      stone,
      handle,
      halo,
      background,
      planets,
      aspects
    );
    emit WandBuilt(tokenId, stone, handle, halo, background, planets, aspects);
    return tokenId;
  }

  function tokenURI(uint256 tokenId)
    public
    view
    override
    returns (string memory)
  {
    require(ERC721._exists(tokenId), "Wands: URI query for nonexistent token");
    return conjuror.generateWandURI(unpack(tokenId, wands[tokenId]));
  }

  function setForge(IForge _forge) external onlyOwner {
    forge = _forge;
  }

  function setConjuror(IConjuror _conjuror) external onlyOwner {
    conjuror = _conjuror;
  }

  function pack(
    uint64 birth,
    uint16 stone,
    Template.Handle memory handle,
    Template.Halo memory halo,
    Template.Background memory background,
    Planet[8] memory planets,
    Aspect[8] memory aspects
  ) internal pure returns (PackedWand memory) {
    (uint128 packedPlanets, uint8 packedVisibility) = packPlanets(planets);
    uint256 packedAspects = packAspects(aspects);
    uint64 packedBackground = packBackground(background);
    uint16 packedHalo = packHalo(halo);
    uint8 packedHandle = packHandle(handle);

    return
      PackedWand({
        background: packedBackground,
        birth: birth,
        planets: packedPlanets,
        aspects: packedAspects,
        stone: stone,
        halo: packedHalo,
        visibility: packedVisibility,
        handle: packedHandle
      });
  }

  function unpack(uint256 tokenId, PackedWand memory packedWand)
    internal
    view
    returns (Wand memory)
  {
    Template.Background memory background = unpackBackground(
      packedWand.background
    );
    Template.Halo memory halo = unpackHalo(packedWand.halo);
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
        xp: address(forge) != address(0)
          ? forge.xp(ERC721.ownerOf(tokenId))
          : 0,
        level: address(forge) != address(0) ? forge.level(tokenId) : 0
      });
  }

  function packPlanets(Planet[8] memory planets)
    internal
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

  function packAspects(Aspect[8] memory aspects)
    internal
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

  function packBackground(Template.Background memory background)
    internal
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

  function unpackBackground(uint64 packedBackground)
    internal
    pure
    returns (Template.Background memory background)
  {
    background.radial = (packedBackground & 0x0001) != 0;
    background.dark = (packedBackground & 0x0002) != 0;
    background.color.saturation = uint8(packedBackground >> 2);
    background.color.lightness = uint8(packedBackground >> 10);
    background.color.hue = uint16(packedBackground >> 18);
  }

  function packHalo(Template.Halo memory halo)
    internal
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

  function unpackHalo(uint16 packedHalo)
    internal
    pure
    returns (Template.Halo memory halo)
  {
    bool[24] memory rhythm;
    for (uint256 i = 0; i < 24; i++) {
      uint256 bit = i > 12 ? 24 - i : i;
      rhythm[i] = ((1 << bit) & (packedHalo >> 3)) != 0;
    }
    uint8 shape = uint8(packedHalo) & 0x07;

    return
      Template.Halo({
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

  function packHandle(Template.Handle memory handle)
    internal
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

  function unpackHandle(uint8 packedHandle)
    internal
    pure
    returns (Template.Handle memory handle)
  {
    return
      Template.Handle({
        handle0: packedHandle == 0,
        handle1: packedHandle == 1,
        handle2: packedHandle == 2,
        handle3: packedHandle == 3
      });
  }
}
