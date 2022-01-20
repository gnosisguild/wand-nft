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
        uint256 handle;
        uint256 halo;
        uint256 environment;
        uint256 evolution;
        string name;
    }

    mapping(uint256 => WandStruct) wands;
    mapping(uint256 => uint256) public randToTokenId;
    mapping(uint256 => string) public assets;
    // 0 = background
    // 1 = border
    // 2 = background_canvas
    // 3 = environement
    // 4 = halo
    // 5 = sparkels
    // 6 = stone
    // 7 = wand handle


    constructor(string[] memory _assets) ERC721("GuildWand", "WAND") {
        for(uint256 i=0; i < _assets.length; i++) {
            setAssets(i, _assets[i]);
        }
        mintWand();
    }

    function setAssets(uint256 index, string memory multiHash) public onlyOwner {
        assets[index] = multiHash;
    }

    function mintWand() public {
        uint256 newWand = _tokenIds.current();
        _safeMint(msg.sender, newWand);
        string memory imageURI = rngToImageEncoding(psuedoRandom());
        _setTokenURI(newWand, formatTokenURI(imageURI));
        _tokenIds.increment();
        //emit CreatedSVGNFT(newWand, svg);
    }

    function generateSVG(uint256 _randomness)
        public
        view
        returns (string memory finalSvg)
    {
        return 
            string(
                abi.encodePacked(
                    '<svg width="200" height="200" ',
                    'xmlns="http://www.w3.org/2000/svg"> ',
                    '<image href="',
                    assets[0],
                    '" height="200" width="200"/>',
                    '<image href="',
                    assets[1],
                    '" height="200" width="200"/> ',
                    '<image href="',
                    assets[2],
                    '" height="200" width="200"/> ',
                    '<image href="',
                    assets[3],
                    '" height="200" width="200"/> ',
                    '<image href="',
                    assets[4],
                    '" height="200" width="200"/> ',
                    '<image href="',
                    assets[5],
                    '" height="200" width="200"/> ',
                    '<image href="',
                    assets[6],
                    '" height="200" width="200"/> ',
                    '<image href="',
                    assets[7],
                    '" height="200" width="200"/> ',
                    "</svg>"
                )
            );
    }

    function rngToImageEncoding(uint256 _rng)
        public
        view
        returns (string memory)
    {
        // TODO: prepend service url here
        string memory baseURL = "data:image/svg+xml;base64,";
        string memory svg = generateSVG(_rng);
        string memory svgBase64Encoded = Base64.encode(
            bytes(string(abi.encodePacked(svg)))
        );
        return string(abi.encodePacked(baseURL, svgBase64Encoded));
    }

    function formatTokenURI(string memory imageURI)
        public
        pure
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                "Guild Wand",
                                '", "description":"Guild Wand", "attributes":"", "image":"',
                                imageURI,
                                '"}'
                            )
                        )
                    )
                )
            );
    }

    function psuedoRandom() private view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.difficulty,
                        block.timestamp,
                        msg.sender
                    )
                )
            );
    }

    function getAttributes(uint256 tokenId)
        public
        view
        returns (bytes memory attributes)
    {
        return (
            abi.encode(
                wands[tokenId].background,
                wands[tokenId].sparkles,
                wands[tokenId].stone,
                wands[tokenId].birth,
                wands[tokenId].handle,
                wands[tokenId].halo,
                wands[tokenId].environment,
                wands[tokenId].evolution,
                wands[tokenId].name
            )
        );
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, tokenId);

        if (from == address(0)) {
            // we are minting
            wands[tokenId].background = psuedoRandom() % 10;
            wands[tokenId].sparkles = psuedoRandom() % 10;
            wands[tokenId].stone = psuedoRandom() % 10;
            wands[tokenId].birth = block.timestamp;
            wands[tokenId].handle = psuedoRandom() % 10;
            wands[tokenId].halo = psuedoRandom() % 10;
            wands[tokenId].environment = psuedoRandom() % 10;
            wands[tokenId].evolution = 0;
            wands[tokenId].name = "Wind Swept River";
        }

        if (to == address(0)) {
            // we are burning
        }

        if (to != address(0) && from != address(0)) {
            // we are transfering
            // reset evolutions and age?
            wands[tokenId].evolution = 0;
            wands[tokenId].birth = block.timestamp;
        }
    }
}
