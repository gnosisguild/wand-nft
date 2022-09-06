// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "../authorization/GatedMint.sol";

contract GatedMintMock is GatedMint {
  constructor(bytes32 rootHash) GatedMint(rootHash) {}

  function _preMint(bytes32[] calldata proof) public {
    GatedMint.preMint(proof);
  }
}
