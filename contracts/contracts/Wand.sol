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

  mapping(uint256 => uint256) public ILvl;
  mapping(address => uint256) public XP;

  event WandBuilt(
    uint256 indexed tokenId,
    uint16 halo,
    uint256 evolution,
    uint256 birth,
    int256 latitude,
    int256 longitude
  );

  event XPLevelUp(address indexed id, uint256 indexed levels, uint256 indexed newLevel);
  event XPLevelDown(address indexed id, uint256 indexed levels, uint256 indexed newLevel);
  event IlvlLevelUp(uint256 indexed id, uint256 indexed levels, uint256 indexed newLevel);
  event IlvlLevelDown(uint256 indexed id, uint256 indexed levels, uint256 indexed newLevel);

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
    uint8 halo,
    int16 latitude,
    int16 longitude,
    Template.Planet[8] memory planets,
    Template.Aspect[8] memory aspects
  ) external override {
    require(
      msg.sender == ERC721.ownerOf(tokenId),
      "Wands: only owner can build wand"
    );
    // Construct Wand
    Wand memory wand = Wand({
      built: true,
      halo: halo,
      evolution: 0,
      birth: block.timestamp,
      latitude: latitude,
      longitude: longitude,
      planets: planets,
      aspects: aspects
    });
    _wands[tokenId] = wand;
    emit WandBuilt(tokenId, halo, 0, block.timestamp, latitude, longitude);
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
      return wandConjuror.generateWandURI(wand);
    }
  }

  function psuedoRandom() private view returns (uint256) {
    return
      uint256(
        keccak256(
          abi.encodePacked(block.difficulty, block.timestamp, msg.sender)
        )
      );
  }

  function wands(uint256 tokenId)
    external
    view
    override
    returns (
      uint8 halo,
      uint256 evolution,
      uint256 birth
    )
  {
    require(_exists(tokenId), "Wand: tokenID does not exist");
    Wand memory wand = _wands[tokenId];
    return (wand.halo, wand.evolution, wand.birth);
  }

  function levelUpXP(address _id, uint256 _levels) public onlyOwner {
      require(XP[_id] + _levels <= 10, "max level is 10");
      require(_exists(_id), "nonexistent id");
      XP[_id] += _levels;
      emit XPLevelUp(_id, _levels, XP[_id]);
  }

  function levelUpXPBatch(address[] memory _ids, uint256[] memory _levels) public onlyOwner {
      require(_ids.length == _levels.length, "length missmatch");
      for(uint256 i=0; i<_ids.length; i++) {
          require(XP[_ids[i]] + _levels[i] <= 10, "max level is 10");
          require(_exists(_ids[i]), "nonexistent id");
          XP[_ids[i]] += _levels[i];
          emit XPLevelUp(_ids[i], _levels[i], XP[_ids[i]]);
      }
  }

  function levelDownXP(address _id, uint256 _levels) public onlyOwner {
      require(_exists(_id), "nonexistent id");
      XP[_id] -= _levels;
      emit XPLevelDown(_id, _levels, XP[_id]);
  }

  function levelDownXPBatch(address[] memory _ids, uint256[] memory _levels) public onlyOwner {
      require(_ids.length == _levels.length, "length missmatch");
      for(uint256 i=0; i<_ids.length; i++) {
          require(_exists(_ids[i]), "nonexistent id");
          XP[_ids[i]] -= _levels[i];
          emit XPLevelDown(_ids[i], _levels[i], XP[_ids[i]]);
      }
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
      _wands[tokenId].birth = block.timestamp;
    }
  }
}
