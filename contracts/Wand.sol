// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./interfaces/IWandConjuror.sol";
import "./interfaces/IWands.sol";

contract Wand is ERC721URIStorage, IWands, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    IWandConjuror public immutable wandConjuror;
    mapping(uint256 => Wand) private _wands;

    event WandBuilt(
        uint256 tokenId,
        uint16 halo,
        uint256 evolution,
        uint256 birth
    );

    constructor(
        IWandConjuror _wandConjuror
    ) ERC721("GuildWand", "WAND") {
        wandConjuror = _wandConjuror;
    }

    function mintWand() public {
        uint256 newWand = _tokenIds.current();
        _safeMint(msg.sender, newWand);
        _tokenIds.increment();
    }

    function build(uint256 tokenId) external override {
        require(msg.sender == ERC721.ownerOf(tokenId), 'Wands: only owner can build wand');
        uint16 halo = 1 + uint16(psuedoRandom() % 4);
        // Construct Wand
        Wand memory wand = Wand({
            built: true,
            halo: halo,
            evolution: 0,
            birth: block.timestamp
        });
        _wands[tokenId] = wand;
        emit WandBuilt(tokenId, halo, 0, block.timestamp);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721URIStorage) returns (string memory) {
        require(_exists(tokenId), 'Wands: URI query for nonexistent token');
        Wand memory wand = _wands[tokenId];

        if (!wand.built) {
            //return wandConjuror.generateWandBadgeURI(calculateWandBadge(tokenId));
        } else {
            return wandConjuror.generateWandURI(wand);
        }
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

    function wands(uint256 tokenId)
        external
        view
        override
        returns (
            uint16 halo,
            uint256 evolution,
            uint256 birth
        )
    {
        require(_exists(tokenId), 'Wand: tokenID does not exist');
        Wand memory wand = _wands[tokenId];
        return (
            wand.halo,
            wand.evolution,
            wand.birth
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
        }

        if (to == address(0)) {
            // we are burning
        }

        if (to != address(0) && from != address(0)) {
            // we are transfering
            // reset evolutions and age?
            _wands[tokenId].evolution = 0;
            _wands[tokenId].birth = block.timestamp;
        }
    }
}
