// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "../Conjuror.sol";

contract WandConjurorExposer is Conjuror {
  // contract makes internal functions public for test setup

  function _interpolateStone(uint16 stoneId)
    public
    pure
    returns (Cauldron.Stone memory)
  {
    return interpolateStone(stoneId);
  }

  function _interpolationParams(uint16 stoneId)
    public
    pure
    returns (
      uint8 from,
      uint8 to,
      uint8 progress
    )
  {
    return interpolationParams(stoneId);
  }
}
