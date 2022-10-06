// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IForge.sol";

interface ITrackOwnership {
  function ownerOf(uint256 tokenId) external returns (address);
}

contract Forge is IForge, Ownable {

  struct Experience {
    uint32 accrued;
    uint32 spent;
  }

  ITrackOwnership public immutable wand;

  mapping(address => Experience) public experience;

  mapping(uint256 => uint8) public override level; // wand tokenId -> level
  uint32[] public override levelUpCost; // array of xp cost for upgrading to the respective levels

  constructor(ITrackOwnership _wand, uint32[] memory levels) {
    wand = _wand;
    levelUpCost = levels;
  }

  function xp(address account) external view override returns (uint32) {
    return experience[account].accrued;
  }

  function xpSpent(address account) external view override returns (uint32) {
    return experience[account].spent;
  }

  function levelUp(uint256 tokenId, uint8 toLevel) external override {
    require(wand.ownerOf(tokenId) == msg.sender, "Not your wand");
    require(toLevel > level[tokenId], "Already at or above that level");
    require(toLevel <= levelUpCost.length, "Level out of bounds");

    uint32 spent = experience[msg.sender].spent;
    uint32 available = experience[msg.sender].accrued - spent;

    for (uint8 i = level[tokenId]; i < toLevel; i++) {
      uint32 cost = levelUpCost[i];
      require(available >= cost, "Not enough XP to spend");
      available -= cost;
      spent += cost;
    }

    level[tokenId] = toLevel;
    experience[msg.sender].spent = spent;
  }

  function adjustXp(address account, uint32 accrued) external onlyOwner {
    uint32 spent = experience[account].spent;

    experience[account] = Experience({
      accrued: accrued,
      spent: spent > accrued ? accrued : spent
    });
  }

  function setLevelUpCost(uint32[] memory levels) external onlyOwner {
    levelUpCost = levels;
  }
}
