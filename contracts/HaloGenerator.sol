// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import './interfaces/IHaloGenerator.sol';
import './interfaces/IHaloSVG.sol';
import '@openzeppelin/contracts/utils/Strings.sol';

/// @dev Generate Halo SVG and properties
contract HaloGenerator is IHaloGenerator {
    using Strings for uint16;

    mapping(uint24 => Color) private _colors;

    IHaloSVG immutable haloSVGs1;
    IHaloSVG immutable haloSVGs2;
    IHaloSVG immutable haloSVGs3;
    IHaloSVG immutable haloSVGs4;


    constructor(
        //uint24[] memory __colors,
        //string[] memory titles,
        //HaloSVGs memory svgs,
        bytes memory svgs
    ) {
        //require(__colors.length == titles.length, 'invalid array lengths');
        // for (uint256 i = 0; i < __colors.length; i++) {
        //     require(__colors[i] != 0, 'FieldGenerator: colors cannot be 0');
        //     _colors[__colors[i]] = Color({title: titles[i], exists: true});
        //     emit ColorAdded(__colors[i], titles[i]);
        // }
        HaloSVGs memory _svgs = abi.decode(svgs, (HaloSVGs));
        haloSVGs1 = _svgs.haloSVGs1;
        haloSVGs2 = _svgs.haloSVGs2;
        haloSVGs3 = _svgs.haloSVGs3;
        haloSVGs4 = _svgs.haloSVGs4;
    }

    function colorExists(uint24 color) public view override returns (bool) {
        return _colors[color].exists;
    }

    function colorTitle(uint24 color) public view override returns (string memory) {
        return _colors[color].title;
    }

    function callHaloSVGs(
        IHaloSVG target,
        uint16 halo
        // colors
    ) internal view returns (IHaloSVG.HaloData memory) {
        bytes memory functionSelector = abi.encodePacked('halo_', uint16(halo).toString(), '()');

        bool success;
        bytes memory result;
        (success, result) = address(target).staticcall(
            abi.encodeWithSelector(bytes4(keccak256(functionSelector)))
        );

        return abi.decode(result, (IHaloSVG.HaloData));
    }

    function generateHalo(uint16 halo)
        external
        view
        override
        returns (IHaloSVG.HaloData memory)
    {
        if (halo <= 4) {
            return callHaloSVGs(haloSVGs1, halo);
        }

        revert('invalid halo selection');
    }
}