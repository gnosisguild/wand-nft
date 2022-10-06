// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

interface IForge {
  function level(uint256 tokenId) external view returns (uint8);

  function xp(address account) external view returns (uint32);

  function xpSpent(address account) external view returns (uint32);

  function levelUpCost(uint256 currentLevel) external view returns (uint32);

  function levelUp(uint256 tokenId, uint8 level) external;
}
