// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

interface IWands is IERC721 {
    struct Wand {
        bool built;
        uint16 halo;
        uint256 evolution;
        uint256 birth;
    }

    function build(uint256 tokenId) external;

    function wands(uint256 tokenId)
        external
        view
        returns (
            uint16 halo,
            uint256 evolution,
            uint256 birth
        );
}
