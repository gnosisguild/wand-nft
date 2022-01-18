// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Wand is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => uint256) public randToTokenId;
    mapping(uint16 => string) public assets;

    constructor() ERC721("GuildWand", "WAND") {}

    function setAssets(uint16 index, string memory QmHash) external onlyOwner {
        assets[index] = "QmHash";
    }

    function generateSVG(uint256 _randomness) public view returns (string memory finalSvg) {

    }

    function svgToImageURI(string memory svg) public pure returns (string memory) {

    }
}
