// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "./IHaloSVG.sol";

/// @dev Generate Halo SVG
interface IHaloGenerator {
    /// @param halo uint representing field selection
    /// @return HaloData containing svg snippet and halo title
    function generateHalo(uint16 halo)
        external
        view
        returns (IHaloSVG.HaloData memory);

    event ColorAdded(uint24 color, string title);

    struct Color {
        string title;
        bool exists;
    }

    /// @notice Returns true if color exists in contract, else false.
    /// @param color 3-byte uint representing color
    /// @return true or false
    function colorExists(uint24 color) external view returns (bool);

    /// @notice Returns the title string corresponding to the 3-byte color
    /// @param color 3-byte uint representing color
    /// @return true or false
    function colorTitle(uint24 color) external view returns (string memory);

    struct HaloSVGs {
        IHaloSVG haloSVGs1;
        IHaloSVG haloSVGs2;
        IHaloSVG haloSVGs3;
        IHaloSVG haloSVGs4;
    }
}
