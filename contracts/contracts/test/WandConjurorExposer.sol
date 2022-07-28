// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "../WandConjuror.sol";

contract WandConjurorExposer is WandConjuror {
  // contract makes internal functions public for test setup

  function _interpolateStone(uint32 stoneId)
    public
    pure
    returns (Template.Stone memory)
  {
    return interpolateStone(stoneId);
  }

  function _unpackStoneId(uint32 stoneId)
    public
    pure
    returns (
      uint8 from,
      uint8 to,
      uint8 progress
    )
  {
    int256 p;
    (from, to, p) = unpackStoneId(stoneId);

    progress = uint8(uint256(p));
  }
}
