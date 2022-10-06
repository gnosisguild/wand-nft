// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IForge.sol";

interface ITrackOwnership {
  function ownerOf(uint256 tokenId) external returns (address);
}

contract Forge is IForge, Ownable {
  uint32[] public levels; // array of xp cost for upgrading to the respective levels

  mapping(uint256 => uint8) override public level; // wand tokenId -> level
  mapping(address => uint32) override public xp; // account -> total gained XP
  mapping(address => uint32) override public xpSpent; // account -> XP that has been redeemed for leveling up wands

  ITrackOwnership public immutable wand;

  constructor(ITrackOwnership _wand, uint32[] memory _levels) {
    wand = _wand;
    levels = _levels;
  }

  function levelUp(uint256 _tokenId, uint8 _level) override external {
    require(wand.ownerOf(_tokenId) == msg.sender, "Not your wand");
    require(_level > level[_tokenId], "Already at or above that level");
    require(_level <= levels.length, "Invalid level");

    uint32 availableXp = xp[msg.sender] - xpSpent[msg.sender];
    for(uint8 i = level[_tokenId] + 1; i <= _level; i++) {
      uint32 levelCost = levels[i-1]; // -1 because level 0 is the default and not listed in the levels cost array
      require(availableXp >= levelCost, "Not enough XP to spend");
      availableXp -= levelCost;
      xpSpent[msg.sender] += levelCost;
    }

    level[_tokenId] = _level;
  }

  function adjustXp(address _account, uint32 _xp) external onlyOwner {
    xp[_account] = _xp;
    if(xpSpent[_account] > _xp) {
      xpSpent[_account] = _xp;
    }
  }

  function adjustXpBatch(address[] memory _accounts, uint32[] memory _xps)
    external
    onlyOwner
  {
    require(_accounts.length == _xps.length);

    for (uint256 i = 0; i < _accounts.length; i++) {
      xp[_accounts[i]] = _xps[i];
      if(xpSpent[_accounts[i]] > _xps[i]) {
        xpSpent[_accounts[i]] = _xps[i];
      }
    }
  }

  function setLevels(uint32[] memory _levels) external onlyOwner {
    levels = _levels;
  }
}
