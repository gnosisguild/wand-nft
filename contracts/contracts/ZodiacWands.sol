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
import "./interfaces/IZodiacWands.sol";
import "./interfaces/IForge.sol";
import "./interfaces/IConjuror.sol";
import "./Decanter.sol";

contract ZodiacWands is IZodiacWands, ERC721, Ownable {
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

  constructor(IConjuror _conjuror) ERC721("ZodiacWands", "WAND") {
    conjuror = _conjuror;
  }

  function mint(
    uint16 stone,
    uint16 halo,
    uint8 handle,
    uint64 background,
    uint128 planets,
    uint256 aspects,
    uint8 visibility
  ) external override returns (uint256) {
    uint256 tokenId = nextTokenId++;
    _safeMint(msg.sender, tokenId);

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

  function tokenURI(uint256 tokenId)
    public
    view
    override
    returns (string memory)
  {
    require(ERC721._exists(tokenId), "ZodiacWands: URI query for nonexistent token");
    return conjuror.generateWandURI(unpack(tokenId), ownerOf(tokenId));
  }

  function unpack(uint256 tokenId) internal view returns (Wand memory) {
    Wand memory wand = Decanter.unpack(tokenId, wands[tokenId]);
    wand.xp = address(forge) != address(0)
      ? forge.xp(ERC721.ownerOf(tokenId))
      : 0;
    wand.level = address(forge) != address(0) ? forge.level(tokenId) : 0;

    return wand;
  }

  function setForge(IForge _forge) external onlyOwner {
    forge = _forge;
  }

  function setConjuror(IConjuror _conjuror) external onlyOwner {
    conjuror = _conjuror;
  }
}
