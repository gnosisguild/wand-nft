// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "./MerkleProof.sol";

contract GatedMint {
  struct MintPermit {
    bytes signature;
    bytes32[] proof;
  }

  bytes32 public merkleRoot;
  mapping(address => bool) public redemptions;

  constructor(bytes32 _merkleRoot) {
    merkleRoot = _merkleRoot;
  }

  function redeem(MintPermit calldata permit) internal {
    address issuer = getIssuer(permit);
    enforceIsAuthorized(permit.proof, issuer);
    enforceIsFresh(issuer);
    redemptions[issuer] = true;
  }

  function getIssuer(MintPermit calldata permit) private view returns (address) {
    if (permit.signature.length > 0) {
      bytes32 messageHash = ECDSA.toEthSignedMessageHash(
        keccak256(abi.encodePacked(msg.sender))
      );

      return ECDSA.recover(messageHash, permit.signature);
    } else {
      return msg.sender;
    }
  }

  function enforceIsAuthorized(bytes32[] calldata proof, address issuer)
    private
    view
  {
    bytes32 root = merkleRoot;
    bytes32 leaf = keccak256(abi.encodePacked(issuer));

    require(
      MerkleProof.verify(proof, root, leaf) == true,
      "MintPermit: Not authorized"
    );
  }

  function enforceIsFresh(address issuer) private view {
    require(redemptions[issuer] == false, "MintPermit: Already used");
  }
}
