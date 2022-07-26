// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./interfaces/IWandConjuror.sol";
import "./interfaces/IWands.sol";

contract Wand is ERC721URIStorage, IWands, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  IWandConjuror public immutable wandConjuror;
  mapping(uint256 => Wand) private _wands;

  event WandBuilt(
    uint256 indexed tokenId,
    uint8 stone,
    uint8 handle,
    uint16 halo,
    Template.Background background,
    IWands.Planet[8] planets,
    IWands.Aspect[8] aspects
  );

  constructor(IWandConjuror _wandConjuror) ERC721("GuildWand", "WAND") {
    wandConjuror = _wandConjuror;
  }

  function mintWand() public {
    uint256 newWand = _tokenIds.current();
    _safeMint(msg.sender, newWand);
    _tokenIds.increment();
  }

  function build(
    uint256 tokenId,
    uint8 stone,
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
    override(ERC721URIStorage)
    returns (string memory)
  {
    require(_exists(tokenId), "Wands: URI query for nonexistent token");
    Wand memory wand = _wands[tokenId];

    if (!wand.built) {
      //return wandConjuror.generateWandBadgeURI(calculateWandBadge(tokenId));
    } else {
      return wandConjuror.generateWandURI(wand, tokenId);
    }
  }

  function wands(uint256 tokenId)
    external
    view
    override
    returns (
      uint16 halo,
      uint32 evolution,
      uint64 birth
    )
  {
    require(_exists(tokenId), "Wand: tokenID does not exist");
    Wand memory wand = _wands[tokenId];
    return (wand.halo, wand.evolution, wand.birth);
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal virtual override {
    super._beforeTokenTransfer(from, to, tokenId);

    if (from == address(0)) {
      // we are minting
    }

    if (to == address(0)) {
      // we are burning
    }

    if (to != address(0) && from != address(0)) {
      // we are transfering
      // reset evolutions and age?
      _wands[tokenId].evolution = 0;
      _wands[tokenId].birth = uint64(block.timestamp);
    }
  }
}