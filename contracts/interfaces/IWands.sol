// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

interface IWands is IERC721 {
  struct Wand {
    bool built;
    uint256 evolution;
    uint256 birth;
    uint16 halo;
    int16 latitude;
    int16 longitude;
  }

  function build(
    uint256 tokenId,
    int16 latitude,
    int16 longitude
  ) external;

  function wands(uint256 tokenId)
    external
    view
    returns (
      uint16 halo,
      uint256 evolution,
      uint256 birth
    );
}
