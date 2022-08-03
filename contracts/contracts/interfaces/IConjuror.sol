// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "./Types.sol";

interface IConjuror {
  function generateWandURI(Wand memory wand, uint256 tokenId)
    external
    view
    returns (string memory);
}
