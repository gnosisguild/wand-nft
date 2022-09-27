// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "../authorization/MerkleProof.sol";

contract MerkleProofMock {
  function verify(
    bytes32[] calldata proof,
    bytes32 root,
    bytes32 leaf
  ) public pure returns (bool) {
    return MerkleProof.verify(proof, root, leaf);
  }
}
