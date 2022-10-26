// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "../Conjuror.sol";

contract WandConjurorMock is Conjuror {
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

  function _interpolateStoneName(uint16 stoneId)
    public
    pure
    returns (
      string memory name,
      string memory majorAlloy,
      uint8 majorWeight,
      string memory minorAlloy,
      uint8 minorWeight
    )
  {
    return interpolateStoneName(stoneId);
  }

  function _haloName(Cauldron.Halo memory halo)
    public
    pure
    returns (string memory)
  {
    return haloName(halo);
  }

  function _stoneList() public pure returns (InceptionStones.Stone[29] memory) {
    return InceptionStones.list();
  }
}
