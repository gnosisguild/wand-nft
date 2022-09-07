// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "./MerkleProof.sol";

contract GatedMint {
  struct MintPermit {
    address signer;
    bytes signature;
    bytes32[] proof;
  }

  bytes32 public merkleRoot;
  mapping(bytes32 => bool) internal merkleLeaves;

  constructor(bytes32 rootHash) {
    merkleRoot = rootHash;
  }

  function greenlist(MintPermit memory permit) internal {
    bytes32 leaf = keccak256(abi.encodePacked(permit.signer));

    ensureSignatureIsValid(permit.signature, permit.signer);
    ensureSignerIsAuthorized(permit.proof, merkleRoot, leaf);
    ensurePermitIsFresh(leaf);

    merkleLeaves[leaf] = true;
  }

  function ensureSignatureIsValid(bytes memory signature, address signer)
    private
    view
  {
    bytes32 messageHash = ECDSA.toEthSignedMessageHash(
      keccak256(abi.encodePacked(msg.sender))
    );

    require(
      ECDSA.recover(messageHash, signature) == signer,
      "Mint permit invalid signature"
    );
  }

  function ensureSignerIsAuthorized(
    bytes32[] memory proof,
    bytes32 root,
    bytes32 leaf
  ) private pure {
    require(
      MerkleProof.verify(proof, root, leaf) == true,
      "Mint signer not authorized"
    );
  }

  function ensurePermitIsFresh(bytes32 leaf) private view {
    require(merkleLeaves[leaf] == false, "Mint permit already used");
  }
}
