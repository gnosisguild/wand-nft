// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "../authorization/GatedMint.sol";

contract GatedMintMock is GatedMint {
  constructor(bytes32 merkleRoot) GatedMint(merkleRoot) {}

  function _redeem(MintPermit calldata permit) public {
    GatedMint.redeem(permit);
  }
}
