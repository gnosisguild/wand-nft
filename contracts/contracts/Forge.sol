// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IForge.sol";

interface ITrackOwnership {
  function ownerOf(uint256 tokenId) external returns (address);
}

contract Forge is IForge, Ownable {
  uint32[] override public nextLevelXp; // array of xp cost for upgrading to the respective levels

  mapping(uint256 => uint8) override public level; // wand tokenId -> level
  mapping(address => uint32) override public xp; // account -> total gained XP
  mapping(address => uint32) override public xpSpent; // account -> XP that has been redeemed for leveling up wands

  ITrackOwnership public immutable wand;

  constructor(ITrackOwnership _wand, uint32[] memory _levels) {
    wand = _wand;
    nextLevelXp = _levels;
  }

  function levelUp(uint256 _tokenId, uint8 _toLevel) override external {
    require(wand.ownerOf(_tokenId) == msg.sender, "Not your wand");
    require(_toLevel > level[_tokenId], "Already at or above that level");
    require(_toLevel <= nextLevelXp.length, "Level out of bounds");

    uint32 availableXp = xp[msg.sender] - xpSpent[msg.sender];
    for(uint8 i = level[_tokenId] + 1; i <= _toLevel; i++) {
      uint32 levelCost = nextLevelXp[i-1]; // -1 because level 0 is the default and not listed in the nextLevelXp cost array
      require(availableXp >= levelCost, "Not enough XP to spend");
      availableXp -= levelCost;
      xpSpent[msg.sender] += levelCost;
    }

    level[_tokenId] = _toLevel;
  }

  function adjustXp(address _account, uint32 _xp) external onlyOwner {
    xp[_account] = _xp;
    if(xpSpent[_account] > _xp) {
      xpSpent[_account] = _xp;
    }
  }

  function setLevels(uint32[] memory _levels) external onlyOwner {
    nextLevelXp = _levels;
  }
}
