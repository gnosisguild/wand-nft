// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IForge.sol";

interface IOwnerOf {
  function ownerOf(uint256 tokenId) external view returns (address);
}

contract Forge is IForge, Ownable {
  IOwnerOf public immutable wand;

  struct Experience {
    uint32 accrued;
    uint32 spent;
  }

  error LevelUpUnauthorized();
  error LevelUpAlreadyThere(uint8 toLevel, uint8 atLevel);
  error LevelUpOutOfBounds(uint8 toLevel, uint8 maxLevel);
  error LevelUpInsufficientXP(uint8 atLevel, uint32 xpAvailable, uint32 xpCost);

  mapping(address => Experience) public experience;

  mapping(uint256 => uint8) public override level; // wand tokenId -> level
  uint32[] public override levelUpCost; // array of xp cost for upgrading to the respective levels

  constructor(IOwnerOf _wand, uint32[] memory levels) {
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
    if (wand.ownerOf(tokenId) != msg.sender) {
      revert LevelUpUnauthorized();
    }

    uint8 currLevel = level[tokenId];
    if (toLevel <= currLevel) {
      revert LevelUpAlreadyThere({toLevel: toLevel, atLevel: currLevel});
    }

    uint8 maxLevel = uint8(levelUpCost.length);
    if (toLevel > maxLevel) {
      revert LevelUpOutOfBounds({toLevel: toLevel, maxLevel: maxLevel});
    }

    uint32 spent = experience[msg.sender].spent;
    uint32 available = experience[msg.sender].accrued - spent;

    for (uint8 atLevel = currLevel; atLevel < toLevel; atLevel++) {
      uint32 cost = levelUpCost[atLevel];

      if (cost > available) {
        revert LevelUpInsufficientXP({
          atLevel: atLevel,
          xpAvailable: available,
          xpCost: cost
        });
      }

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
