// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

interface IForge {
  struct Character {
    uint256 XP;
    uint256 XPAssigned;
  }

  function getILvl(uint256 tokenId) external view returns (uint8);
}
