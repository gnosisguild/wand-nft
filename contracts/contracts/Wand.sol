// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IWandConjuror.sol";
import "./interfaces/IWands.sol";
import "./interfaces/IForge.sol";

contract Wand is ERC721, IWands, Ownable {
  IForge public forge;
  IWandConjuror public conjuror;

  uint256 internal nextTokenId;
  mapping(uint256 => Wand) internal wands;

  event WandBuilt(
    uint256 indexed tokenId,
    uint16 stone,
    uint8 handle,
    uint16 halo,
    Template.Background background,
    IWands.Planet[8] planets,
    IWands.Aspect[8] aspects
  );

  constructor(IWandConjuror _conjuror)
    ERC721("GuildWand", "WAND")
  {
    conjuror = _conjuror;
  }

  function mint(
    uint16 stone,
    uint8 handle,
    uint16 halo,
    Template.Background memory background,
    IWands.Planet[8] memory planets,
    IWands.Aspect[8] memory aspects
  ) external override returns (uint256) {
    uint256 tokenId = nextTokenId++;
    _safeMint(msg.sender, tokenId);

    wands[tokenId] = concoct(
      wands[tokenId],
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
    return conjuror.generateWandURI(wands[tokenId], tokenId);
  }

  function concoct(
    Wand storage wand,
    uint16 stone,
    uint8 handle,
    uint16 halo,
    Template.Background memory background,
    IWands.Planet[8] memory planets,
    IWands.Aspect[8] memory aspects
  ) internal returns (Wand storage) {
    wand.stone = stone;
    wand.handle = handle;
    wand.halo = halo;
    wand.background = background;
    wand.evolution = 0;
    wand.birth = uint64(block.timestamp);
    for (uint256 i = 0; i < 8; i++) {
      wand.planets[i] = IWands.Planet({
        visible: planets[i].visible,
        x: planets[i].x,
        y: planets[i].y
      });
      wand.aspects[i] = IWands.Aspect({
        x1: aspects[i].x1,
        y1: aspects[i].y1,
        x2: aspects[i].x2,
        y2: aspects[i].y2
      });
    }
    return wand;
  }

  function setForge(IForge _forge) external onlyOwner {
    forge = _forge;
  }

  function setConjuror(IWandConjuror _conjuror) external onlyOwner {
    conjuror = _conjuror;
  }
}
