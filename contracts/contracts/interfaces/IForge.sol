// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

interface IForge {
  function level(uint256 tokenId) external view returns (uint8);

  function xp(address avatar) external view returns (uint32);

  function xpSpent(address avatar) external view returns (uint32);

  function nextLevelXp(uint256 _currentLevel) external view returns (uint32);

  function levelUp(uint256 _tokenId, uint8 _level) external;
}
