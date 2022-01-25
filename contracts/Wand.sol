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
        uint256 border;
        uint256 canvas;
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
    string[] public backgrounds;
    string[] public borders;
    string[] public canvases;
    string[] public environments;
    string[] public halos;
    string[] public sparkles;
    string[] public stones;
    string[] public handles;

    constructor() ERC721("GuildWand", "WAND") {}

    function initAssets(uint8 selector, string memory multiHash)
        public
        onlyOwner
    {
        if (selector == 0) backgrounds.push(multiHash);
        if (selector == 1) borders.push(multiHash);
        if (selector == 2) canvases.push(multiHash);
        if (selector == 3) environments.push(multiHash);
        if (selector == 4) halos.push(multiHash);
        if (selector == 5) sparkles.push(multiHash);
        if (selector == 6) stones.push(multiHash);
        if (selector == 7) handles.push(multiHash);
    }

    function setAssets(
        uint8 selector,
        uint256 index,
        string memory multiHash
    ) public onlyOwner {
        if (selector == 0) backgrounds[index] = multiHash;
        if (selector == 1) borders[index] = multiHash;
        if (selector == 2) canvases[index] = multiHash;
        if (selector == 3) environments[index] = multiHash;
        if (selector == 4) halos[index] = multiHash;
        if (selector == 5) sparkles[index] = multiHash;
        if (selector == 6) stones[index] = multiHash;
        if (selector == 7) handles[index] = multiHash;
    }

    function mintWand() public {
        uint256 newWand = _tokenIds.current();
        _safeMint(msg.sender, newWand);
        generateAssetsFromRNG(psuedoRandom(), newWand);
        string memory imageURI = rngToImageEncoding(newWand);
        string memory attributes = encodeAttributes(newWand);
        _setTokenURI(newWand, formatTokenURI(imageURI, attributes));
        _tokenIds.increment();
        //emit CreatedSVGNFT(newWand, svg);
    }

    function generateAssetsFromRNG(uint256 _randomness, uint256 _id) internal {
        // TODO: select asset index from rng and store it on struct, change modulus to fit in range of asset
        wands[_id].background = _randomness % backgrounds.length;
        wands[_id].border = _randomness % borders.length;
        wands[_id].canvas = _randomness % canvases.length;
        wands[_id].environment = _randomness % environments.length;
        wands[_id].halo = _randomness % halos.length;
        wands[_id].sparkles = _randomness % sparkles.length;
        wands[_id].stone = _randomness % stones.length;
        wands[_id].handle = _randomness % handles.length;
        // todo get name from lib or just use same asset mapping here
    }

    function generateSVG(uint256 _id)
        public
        view
        returns (string memory finalSvg)
    {
        return
            string(
                abi.encodePacked(
                    '<svg width="500" height="750" ',
                    'xmlns="http://www.w3.org/2000/svg"> ',
                    '<image href="',
                    backgrounds[wands[_id].background],
                    '" height="750" width="500"/>',
                    '<image href="',
                    borders[wands[_id].border],
                    '" height="750" width="500"/> ',
                    '<image href="',
                    canvases[wands[_id].canvas],
                    '" height="750" width="500"/> ',
                    '<image href="',
                    environments[wands[_id].environment],
                    '" height="750" width="500"/> ',
                    '<image href="',
                    halos[wands[_id].halo],
                    '" height="750" width="500"/> ',
                    '<image href="',
                    sparkles[wands[_id].sparkles],
                    '" height="750" width="500"/> ',
                    '<image href="',
                    stones[wands[_id].stone],
                    '" height="750" width="500"/> ',
                    '<image href="',
                    handles[wands[_id].handle],
                    '" height="750" width="500"/> ',
                    "</svg>"
                )
            );
    }

    function rngToImageEncoding(uint256 _id)
        public
        view
        returns (string memory)
    {
        // TODO: prepend service url here
        string memory baseURL = "data:image/svg+xml;base64,";
        string memory svg = generateSVG(_id);
        string memory svgBase64Encoded = Base64.encode(bytes(svg));
        return string(abi.encodePacked(baseURL, svgBase64Encoded));
    }

    function encodeAttributes(uint256 _id) public view returns (string memory) {
        return string(abi.encodePacked());
    }

    function formatTokenURI(string memory imageURI, string memory attributes)
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
                                '{"name":"Guild Wand",',
                                '"description":"Guild Wand",',
                                '"attributes":"',
                                attributes,
                                '",',
                                '"image":"',
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
                wands[tokenId].border,
                wands[tokenId].canvas,
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
