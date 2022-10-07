// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IForge.sol";

interface IOwnerOf {
  function ownerOf(uint256 tokenId) external view returns (address);
}

contract Forge is IForge, Ownable {
  IOwnerOf public immutable wand;

  struct Score {
    uint32 accrued;
    uint32 spent;
  }

  error NotYourWand();
  error WithinCurrentLevel(uint8 fromLevel, uint8 toLevel);
  error BeyondMaxLevel(uint8 fromLevel, uint8 toLevel, uint8 maxLevel);
  error InsufficientXP(
    uint8 fromLevel,
    uint8 toLevel,
    uint8 atLevel,
    uint32 xpAvailable,
    uint32 xpCost
  );

  event LeveledUp(
    address indexed account,
    uint256 indexed tokenId,
    uint8 fromLevel,
    uint8 toLevel
  );

  event XpAdjusted(address indexed account, uint32 xp, uint32 xpSpent);

  mapping(address => Score) internal score;

  mapping(uint256 => uint8) public override level; // wand tokenId -> level
  uint32[] public override levelUpCost; // array of xp cost for upgrading to the respective levels

  constructor(IOwnerOf _wand, uint32[] memory levels) {
    wand = _wand;
    levelUpCost = levels;
  }

  function xp(address account) external view override returns (uint32) {
    return score[account].accrued;
  }

  function xpSpent(address account) external view override returns (uint32) {
    return score[account].spent;
  }

  function levelUp(uint256 tokenId, uint8 toLevel) external override {
    if (wand.ownerOf(tokenId) != msg.sender) {
      revert NotYourWand();
    }

    uint8 fromLevel = level[tokenId];
    if (toLevel <= fromLevel) {
      revert WithinCurrentLevel(fromLevel, toLevel);
    }

    uint8 maxLevel = uint8(levelUpCost.length);
    if (toLevel > maxLevel) {
      revert BeyondMaxLevel(fromLevel, toLevel, maxLevel);
    }

    uint32 spent = score[msg.sender].spent;
    uint32 available = score[msg.sender].accrued - spent;

    for (uint8 atLevel = fromLevel; atLevel < toLevel; atLevel++) {
      uint32 cost = levelUpCost[atLevel];

      if (cost > available) {
        revert InsufficientXP({
          fromLevel: fromLevel,
          toLevel: toLevel,
          atLevel: atLevel,
          xpAvailable: available,
          xpCost: cost
        });
      }

      available -= cost;
      spent += cost;
    }

    level[tokenId] = toLevel;
    score[msg.sender].spent = spent;

    emit LeveledUp(msg.sender, tokenId, fromLevel, toLevel);
  }

  function adjustXp(address account, uint32 accrued) external onlyOwner {
    uint32 spent = score[account].spent > accrued
      ? accrued
      : score[account].spent;

    score[account] = Score({accrued: accrued, spent: spent});

    emit XpAdjusted(account, accrued, spent);
  }

  function setLevelUpCost(uint32[] memory levels) external onlyOwner {
    levelUpCost = levels;
  }
}
