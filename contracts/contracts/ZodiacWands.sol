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
    uint8 handle,
    uint16 halo,
    Template.Background background,
    Planet[8] planets,
    Aspect[8] aspects
  );

  constructor(IConjuror _conjuror) ERC721("ZodiacWands", "WAND") {
    conjuror = _conjuror;
  }

  function mint(
    uint16 stone,
    uint8 handle,
    uint16 halo,
    Template.Background memory background,
    Planet[8] memory planets,
    Aspect[8] memory aspects
  ) external override returns (uint256) {
    uint256 tokenId = nextTokenId++;
    _safeMint(msg.sender, tokenId);

    wands[tokenId] = pack(
      stone,
      handle,
      halo,
      uint64(block.timestamp),
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
    return conjuror.generateWandURI(unpack(wands[tokenId]), tokenId);
  }

  function setForge(IForge _forge) external onlyOwner {
    forge = _forge;
  }

  function setConjuror(IConjuror _conjuror) external onlyOwner {
    conjuror = _conjuror;
  }

  function pack(
    uint16 stone,
    uint8 handle,
    uint16 halo,
    uint64 birth,
    Template.Background memory background,
    Planet[8] memory planets,
    Aspect[8] memory aspects
  ) internal pure returns (PackedWand memory) {
    (uint128 packedPlanets, uint8 visibility) = packPlanets(planets);
    uint256 packedAspects = packAspects(aspects);
    uint64 packedBackground = packBackground(background);

    return
      PackedWand({
        background: packedBackground,
        birth: birth,
        planets: packedPlanets,
        aspects: packedAspects,
        stone: stone,
        halo: halo,
        visibility: visibility,
        handle: handle
      });
  }

  function unpack(PackedWand memory packedWand)
    internal
    pure
    returns (Wand memory)
  {
    return
      Wand({
        stone: packedWand.stone,
        halo: packedWand.halo,
        birth: packedWand.birth,
        handle: packedWand.handle,
        background: unpackBackground(packedWand.background),
        planets: unpackPlanets(packedWand.planets, packedWand.visibility),
        aspects: unpackAspects(packedWand.aspects)
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
}
