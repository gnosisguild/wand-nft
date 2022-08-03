// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IWandConjuror.sol";
import "./interfaces/IWands.sol";
import "./interfaces/IForge.sol";

contract Wand is ERC721, IWands, Ownable {
  IForge public forge;
  IWandConjuror public immutable conjuror;

  uint256 private nextTokenId;
  mapping(uint256 => Wand) private _wands;

  event WandBuilt(
    uint256 indexed tokenId,
    uint16 stone,
    uint8 handle,
    uint16 halo,
    Template.Background background,
    IWands.Planet[8] planets,
    IWands.Aspect[8] aspects
  );

  constructor(IForge _forge, IWandConjuror _conjuror) ERC721("GuildWand", "WAND") {
    forge = _forge;
    conjuror = _conjuror;
  }

  function mintWand() public {
    _safeMint(msg.sender, nextTokenId);
    nextTokenId = nextTokenId + 1;
  }

  function build(
    uint256 tokenId,
    uint16 stone,
    uint8 handle,
    uint16 halo,
    Template.Background memory background,
    IWands.Planet[8] memory planets,
    IWands.Aspect[8] memory aspects
  ) external override {
    require(
      msg.sender == ERC721.ownerOf(tokenId),
      "Wands: only owner can build wand"
    );

    // TODO: check tokenID is not already built?
    // Construct Wand
    Wand storage wand = _wands[tokenId];
    wand.built = true;
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
    emit WandBuilt(tokenId, stone, handle, halo, background, planets, aspects);
  }

  function tokenURI(uint256 tokenId)
    public
    view
    override
    returns (string memory)
  {
    require(_exists(tokenId), "Wands: URI query for nonexistent token");
    Wand storage wand = _wands[tokenId];

    if (!wand.built) {
      //return wandConjuror.generateWandBadgeURI(calculateWandBadge(tokenId));
    } else {
      return wandConjuror.generateWandURI(wand, tokenId);
    }
  }

  function setForge(IForge _forge) external onlyOwner {
    forge = _forge;
  }

  function setConjuror(IWandConjuror _conjuror) external onlyOwner {
    conjuror = _conjuror;
  }
}
