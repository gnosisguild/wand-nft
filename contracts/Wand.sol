// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "base64-sol/base64.sol";

contract Wand is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    struct WandStruct {
        uint256 background;
        uint256 sparkles;
        uint256 stone;
        uint256 birth;
        uint256 rod;
        uint256 upgrade;
        string name;
    }

    mapping (uint256 => WandStruct) wands;

    mapping(uint256 => uint256) public randToTokenId;
    mapping(uint16 => string) public assets;

    constructor() ERC721("GuildWand", "WAND") {
        mintWand(
            string(
                abi.encodePacked(
                    '<svg width="200" height="200"',
                        'xmlns="http://www.w3.org/2000/svg">',
                        '<image href="https://i.imgur.com/4xK1AjQ.png" height="200" width="200"/>',
                        '<image href="https://i.imgur.com/5nFAehJ.png" height="200" width="200"/>',
                    '</svg>'
                )
            )
        );
    }

    function setAssets(uint16 index, string memory QmHash) external onlyOwner {
        assets[index] = "QmHash";
    }

    function mintWand(string memory svg) public {
        uint256 newWand = _tokenIds.current();
        _safeMint(msg.sender, newWand);
        string memory imageURI = svgToImageURI(svg);
        _setTokenURI(newWand, formatTokenURI(imageURI));
        _tokenIds.increment();
        //emit CreatedSVGNFT(newWand, svg);
    }

    function generateSVG(uint256 _randomness) public view returns (string memory finalSvg) {

    }

    function svgToImageURI(string memory svg) public pure returns (string memory) {
        string memory baseURL = "data:image/svg+xml;base64,";
        string memory svgBase64Encoded = Base64.encode(bytes(string(abi.encodePacked(svg))));
        return string(abi.encodePacked(baseURL,svgBase64Encoded));
    }

    function formatTokenURI(string memory imageURI) public pure returns (string memory) {
        return string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                "Guild Wand",
                                '", "description":"Guild Wand", "attributes":"", "image":"',imageURI,'"}'
                            )
                        )
                    )
                )
            );
    }

    function psuedoRandom() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, msg.sender)));
    }

    function getAttributes(uint256 tokenId) public view returns (
        uint256 background,
        uint256 sparkles,
        uint256 stone,
        uint256 birth,
        uint256 rod,
        uint256 upgrade,
        string memory name
        ) {
        return (
            wands[tokenId].background,
            wands[tokenId].sparkles,
            wands[tokenId].stone,
            wands[tokenId].birth,
            wands[tokenId].rod,
            wands[tokenId].upgrade,
            wands[tokenId].name
        );
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual override {
        super._beforeTokenTransfer(from, to, tokenId);

        if (from == address(0)) {
            // we are minting
            wands[tokenId].background = psuedoRandom() % 10;
            wands[tokenId].sparkles = psuedoRandom() % 10;
            wands[tokenId].stone = psuedoRandom() % 10;
            wands[tokenId].birth = block.timestamp;
            wands[tokenId].rod = psuedoRandom() % 10;
            wands[tokenId].upgrade = 0;
            wands[tokenId].name = "Wind Swept River";
        }

        if (to == address(0)) {
            // we are burning
        }

        if (to != address(0) && from != address(0)) {
            // we are transfering
            // reset upgrades and age?
            wands[tokenId].upgrade = 1;
            wands[tokenId].birth = block.timestamp;
        }
    }
}
