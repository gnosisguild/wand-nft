// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./MerkleProof.sol";

contract GatedMint {
  bytes32 internal rootHash;
  mapping(bytes32 => bool) internal minted;

  constructor(bytes32 _rootHash) {
    rootHash = _rootHash;
  }

  function preMint(bytes32[] calldata proof) internal {
    bytes32 leaf = keccak256(abi.encodePacked(msg.sender));

    require(
      MerkleProof.verify(proof, rootHash, leaf) == true,
      "Invalid mint permit"
    );
    require(
      minted[leaf] == false,
      "Mint permit already used"
    );
    minted[leaf] = true;
  }
}
