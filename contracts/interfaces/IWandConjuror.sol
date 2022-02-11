// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "./IWands.sol";
import "./IHaloGenerator.sol";

interface IWandConjuror {
    function haloGenerator() external returns (IHaloGenerator);

    function generateWandURI(IWands.Wand memory wand)
        external
        view
        returns (string memory);
}
