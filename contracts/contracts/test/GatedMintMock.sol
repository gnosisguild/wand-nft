// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "../authorization/GatedMint.sol";

contract GatedMintMock is GatedMint {
  constructor(bytes32 merkleRoot) GatedMint(merkleRoot) {}

  function _preMint(MintPermit memory permit) public {
    GatedMint.preMint(permit);
  }
}
