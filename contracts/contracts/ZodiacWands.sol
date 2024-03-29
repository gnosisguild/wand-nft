//      ****           *                 **                                       ***** *    **   ***                                 **
//     *  *************                   **     *                             ******  *  *****    ***                                 **
//    *     **********                    **    ***                           **   *  *     *****   ***                                **
//    *             *                     **     *                           *    *  **     * **      **                               **
//     **          *        ****          **                                     *  ***     *         **                               **      ****
//                *        * ***  *   *** **   ***        ****       ****       **   **     *         **    ****    ***  ****      *** **     * **** *
//               *        *   ****   *********  ***      * ***  *   * ***  *    **   **     *         **   * ***  *  **** **** *  *********  **  ****
//              *        **    **   **   ****    **     *   ****   *   ****     **   **     *         **  *   ****    **   ****  **   ****  ****
//             *         **    **   **    **     **    **    **   **            **   **     *         ** **    **     **    **   **    **     ***
//            *          **    **   **    **     **    **    **   **            **   **     *         ** **    **     **    **   **    **       ***
//           *           **    **   **    **     **    **    **   **             **  **     *         ** **    **     **    **   **    **         ***
//          *            **    **   **    **     **    **    **   **              ** *      *         *  **    **     **    **   **    **    ****  **
//      ****           *  ******    **    **     **    **    **   ***     *        ***      ***      *   **    **     **    **   **    **   * **** *
//     *  *************    ****      *****       *** *  ***** **   *******          ******** ********     ***** **    ***   ***   *****        ****
//    *     **********                ***         ***    ***   **   *****             ****     ****        ***   **    ***   ***   ***
//
//
//                              ...             ...
//                             .*%&*..       .,*&&*.
//                            .*%&&&&&/*,,,*/%&&%&&*.
//               ,         ..,%%&&%%&#/*,.,*/%&&%&&&(,..
//                ,%&%////%%/,,,*/%&%*.     .*&%%/*,,,(%%////#&%,
//                .*%&%&&&(,. .   .,%.,     ,.#,.   . .*#&&%%&&*.
//                .*%&&&&&%,.                         .,%&%&&&&*.                       ‘O most honored Greening Force, You who roots in the Sun;
//               .,##***,**#.     .    .*%,.    ..    ,%**,,**&(,                        You who lights up, in shining serenity, within a wheel
//             .,*&*.            ,.,.,,*//**,.,..            ..*%*,.                     that earthly excellence fails to comprehend.
//        .,*/%&&&#/,   ,   .  .*,/((###%%%#####/,,.      .   ./&&&%(**,.
//        .,/%&%&#%&#*..     .,,//((#%&&&&&%%%%%###,,.     ,.*%&&&%&%&*,.                You are enfolded
//          .,(%&%(*,,..    ,,**//(((##%&&&&&%%%%###,/,    ..,,*(#%&(,.                  in the weaving of divine mysteries.
//           .,%/,.     ,  ,,,**///((####%%&&%&%%%###,,         .,#%,
//            ,%*.         ,,,(((///(((#####%%%%%##%#,,          ,/#,                    You redden like the dawn
//           ,/&%(*,..,  .  ,.**(/////@((((((#####&#*.,     ...,*#&%*,                   and you burn: flame of the Sun.”
//         .*&&%&#%&&(,.     ,.*////////&/(/((((#%%*.,     .,%%%&&%&&#*.
//       /((%%&&&&&/,         .,.*(((((///(((#(#(*.,,        .*/%&&&&&%##,               –  Hildegard von Bingen, Causae et Curae
//            .,*%%*.,.          ,,.,*(((((((*,.,,          . .*&#*..
//               .*%*,.....*.        ,,*/%#*,    ,    .......,*%*.
//                .*&%&%%(,.         .,*,(/(,,         .,%&&&&%*.
//                .*&&&*,           ..,*(#//, .    .     .,/#%%,.
//                .#/,.       .       .**#/*.       .       .,%*.
//                                    .**#/,.              .
//                                    .,./*,,

// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IForge.sol";
import "./interfaces/IConjuror.sol";
import "./authorization/GatedMint.sol";
import "./Decanter.sol";

contract ZodiacWands is ERC721, GatedMint, Ownable {
  IForge public forge;
  IConjuror public conjuror;

  uint256 internal nextTokenId;
  mapping(uint256 => PackedWand) internal wands;

  event WandBuilt(
    uint256 indexed tokenId,
    uint16 stone,
    uint8 handle,
    uint16 halo,
    uint64 background,
    uint128 planets,
    uint256 aspects
  );

  constructor(IConjuror _conjuror, bytes32 merkleRoot)
    ERC721("ZodiacWands", "WAND")
    GatedMint(merkleRoot)
  {
    conjuror = _conjuror;
  }

  function tokenURI(uint256 tokenId)
    public
    view
    override
    returns (string memory)
  {
    require(
      ERC721._exists(tokenId),
      "ZodiacWands: URI query for nonexistent token"
    );
    return conjuror.generateWandURI(unpack(tokenId), ERC721.ownerOf(tokenId));
  }

  function mint(
    uint16 stone,
    uint16 halo,
    uint8 handle,
    uint64 background,
    uint128 planets,
    uint256 aspects,
    uint8 visibility,
    MintPermit calldata permit
  ) external returns (uint256) {
    redeem(permit);

    uint256 tokenId = nextTokenId++;
    ERC721._safeMint(msg.sender, tokenId);

    wands[tokenId] = PackedWand({
      background: background,
      birth: uint64(block.timestamp),
      planets: planets,
      aspects: aspects,
      stone: stone,
      halo: halo,
      visibility: visibility,
      handle: handle
    });

    emit WandBuilt(tokenId, stone, handle, halo, background, planets, aspects);
    return tokenId;
  }

  function unpack(uint256 tokenId) internal view returns (Wand memory) {
    Wand memory wand = Decanter.unpack(tokenId, wands[tokenId]);

    wand.level = forge.level(tokenId);

    uint32 amount = forge.xp(ownerOf(tokenId));
    uint32 cap = forge.xpLeader();

    wand.xp = Cauldron.Xp({amount: amount, cap: cap, crown: amount >= cap});

    return wand;
  }

  function setMerkleRoot(bytes32 nextMerkleRoot) external onlyOwner {
    merkleRoot = nextMerkleRoot;
  }

  function setForge(IForge _forge) external onlyOwner {
    forge = _forge;
  }

  function setConjuror(IConjuror _conjuror) external onlyOwner {
    conjuror = _conjuror;
  }
}
