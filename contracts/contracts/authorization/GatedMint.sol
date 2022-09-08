// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "./MerkleProof.sol";

contract GatedMint {
  struct MintPermit {
    bytes signature;
    address issuer;
    bytes32[] proof;
  }

  bytes32 public merkleRoot;
  mapping(bytes32 => bool) public merkleLeaves;

  constructor(bytes32 _merkleRoot) {
    merkleRoot = _merkleRoot;
  }

  function greenlist(MintPermit memory permit) internal {
    bytes32 leaf = keccak256(abi.encodePacked(permit.issuer));

    ensureSignatureIsValid(permit.signature, permit.issuer);
    ensureIssuerIsAuthorized(permit.proof, merkleRoot, leaf);
    ensurePermitIsFresh(leaf);

    merkleLeaves[leaf] = true;
  }

  function ensureSignatureIsValid(bytes memory signature, address issuer)
    private
    view
  {
    bytes32 messageHash = ECDSA.toEthSignedMessageHash(
      keccak256(abi.encodePacked(msg.sender))
    );

    require(
      ECDSA.recover(messageHash, signature) == issuer,
      "MintPermit: Invalid signature"
    );
  }

  function ensureIssuerIsAuthorized(
    bytes32[] memory proof,
    bytes32 root,
    bytes32 leaf
  ) private pure {
    require(
      MerkleProof.verify(proof, root, leaf) == true,
      "MintPermit: Issuer not authorized"
    );
  }

  function ensurePermitIsFresh(bytes32 leaf) private view {
    require(merkleLeaves[leaf] == false, "MintPermit: Already used");
  }
}
