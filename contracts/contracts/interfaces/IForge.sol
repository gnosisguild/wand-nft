// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

interface IForge {
  function getILvl(uint256 tokenId)
    external
    view
    returns (uint8);
}
