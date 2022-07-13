// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "./interfaces/IWands.sol";
import "./svg/Template.sol";
import "./WandName.sol";
import "base64-sol/base64.sol";
import "hardhat/console.sol";

contract WandConjuror {
  constructor() {}

  function generateWandURI(IWands.Wand memory wand, uint256 tokenId)
    external
    view
    returns (string memory)
  {
    string memory name = WandName.generateWandName(tokenId);

    return
      string(
        abi.encodePacked(
          "data:application/json;base64,",
          Base64.encode(
            bytes(
              abi.encodePacked(
                '{"name": "',
                name,
                '", "description":"A unique Wand, designed and built on-chain", "image": "data:image/svg+xml;base64,', // TODO: edit description
                Base64.encode(bytes(generateSVG(wand, tokenId, name))),
                '", "attributes": [',
                generateAttributes(wand),
                "]}"
              )
            )
          )
        )
      );
  }

  function generateAttributes(IWands.Wand memory wand)
    internal
    pure
    returns (string memory)
  {
    return
      string(
        abi.encodePacked(
          '{"trait_type": "Level", "value": ',
          SolidMustacheHelpers.uintToString(0, 0), // TODO
          '},{"trait_type": "Evolution", "value": ',
          SolidMustacheHelpers.uintToString(wand.evolution, 0),
          '},{"trait_type": "Birth", "display_type": "date", "value": ',
          SolidMustacheHelpers.uintToString(wand.birth, 0),
          "}"
        )
      );
  }

  function generateSVG(
    IWands.Wand memory wand,
    uint256 tokenId,
    string memory name
  ) internal view returns (string memory svg) {
    uint32 xpCap = 10000;
    return
      Template.render(
        Template.__Input({
          background: decodeBackground(wand),
          seed: tokenId,
          planets: scalePlanets(wand.planets),
          aspects: scaleAspects(wand.aspects),
          handle: Template.Handle({
            handle0: wand.handle == 0,
            handle1: wand.handle == 1,
            handle2: wand.handle == 2,
            handle3: wand.handle == 3
          }),
          xp: Template.Xp({
            cap: xpCap,
            amount: wand.evolution,
            crown: wand.evolution >= xpCap
          }),
          stone: decodeStone(wand),
          halo: decodeHalo(wand),
          frame: generateFrame(wand, name),
          sparkles: generateSparkles(tokenId),
          filterLayers: generateFilterLayers()
        })
      );
  }

  function decodeBackground(IWands.Wand memory wand)
    internal
    pure
    returns (Template.Background memory)
  {
    return
      Template.Background({
        radial: wand.background.radial,
        linear: !wand.background.radial,
        dark: wand.background.dark,
        light: !wand.background.dark,
        color: wand.background.color
      });
  }

  function decodeStone(IWands.Wand memory wand)
    internal
    pure
    returns (Template.Stone memory)
  {
    return
      [
        Template.Stone({
          fractalNoise: false,
          turbFreqX: 2,
          turbFreqY: 1,
          turbOct: 3,
          redAmp: 90,
          redExp: 15,
          redOff: -69,
          greenAmp: 66,
          greenExp: -24,
          greenOff: -23,
          blueAmp: 11,
          blueExp: -85,
          blueOff: -16,
          rotation: 218
        }),
        Template.Stone({
          fractalNoise: true,
          turbFreqX: 4,
          turbFreqY: 7,
          turbOct: 2,
          redAmp: 69,
          redExp: -43,
          redOff: 16,
          greenAmp: 61,
          greenExp: -66,
          greenOff: -63,
          blueAmp: 58,
          blueExp: 1,
          blueOff: -15,
          rotation: 306
        })
      ][wand.stone];
  }

  function decodeHalo(IWands.Wand memory wand)
    internal
    pure
    returns (Template.Halo memory)
  {
    uint256 rhythmBits = wand.halo >> 3; // first 13 bits give the rhythm
    uint256 shape = wand.halo % rhythmBits; // remaining 3 bits are the halo shape index
    bool[24] memory rhythm;
    for (uint256 i = 0; i < 24; i++) {
      uint256 bit = i > 12 ? 24 - i : i; // rhythm repeats backwards after 13 beats
      rhythm[i] = (1 << bit) & rhythmBits > 0; 
    }

    return
      Template.Halo({
        halo0: shape == 0,
        halo1: shape == 1,
        halo2: shape == 2,
        halo3: shape == 3,
        halo4: shape == 4,
        halo5: shape == 5,
        hue: (wand.background.color.hue + 180) % 360,
        rhythm: rhythm
      });
  }

  function generateFrame(IWands.Wand memory wand, string memory name)
    internal
    pure
    returns (Template.Frame memory)
  {
    return
      Template.Frame({
        level1: wand.evolution == 0,
        level2: wand.evolution == 1,
        level3: wand.evolution == 2,
        level4: wand.evolution == 3,
        level5: wand.evolution == 4,
        title: name
      });
  }

  function generateFilterLayers()
    internal
    pure
    returns (Template.FilterLayer[3] memory)
  {
    return [
      Template.FilterLayer({
        blurX: 19,
        blurY: 17,
        dispScale: 77,
        lightColor: Template.Color({hue: 0, saturation: 0, lightness: 100}),
        opacity: 20,
        pointX: -493,
        pointY: 514,
        pointZ: 104,
        specConstant: 819,
        specExponent: 4,
        surfaceScale: -7,
        turbBlur: 54,
        turbFreqX: 17,
        turbFreqY: 17,
        turbOct: 1,
        fractalNoise: true
      }),
      Template.FilterLayer({
        blurX: 19,
        blurY: 17,
        dispScale: 90,
        lightColor: Template.Color({hue: 0, saturation: 0, lightness: 100}),
        opacity: 25,
        pointX: -139,
        pointY: 514,
        pointZ: 104,
        specConstant: 762,
        specExponent: 4,
        surfaceScale: -11,
        turbBlur: 76,
        turbFreqX: 1,
        turbFreqY: 9,
        turbOct: 1,
        fractalNoise: true
      }),
      Template.FilterLayer({
        blurX: 19,
        blurY: 17,
        dispScale: 88,
        lightColor: Template.Color({hue: 58, saturation: 100, lightness: 94}),
        opacity: 34,
        pointX: -493,
        pointY: 514,
        pointZ: 104,
        specConstant: 359,
        specExponent: 3,
        surfaceScale: 157,
        turbBlur: 73,
        turbFreqX: 19,
        turbFreqY: 19,
        turbOct: 1,
        fractalNoise: true
      })
    ];
  }

  function generateSparkles(uint256 seed)
    internal
    pure
    returns (Template.Sparkle[] memory result)
  {
    uint256 sparkleCount = 4 + (uint256(keccak256(abi.encodePacked(seed))) % 4);
    result = new Template.Sparkle[](sparkleCount);
    for (uint256 i = 0; i < sparkleCount; i++) {
      result[i] = Template.Sparkle({
        tx: uint16(
          1820 -
            (uint256(keccak256(abi.encodePacked(seed + 10 * i + 0))) % 1640)
        ),
        ty: uint16(
          1880 -
            (uint256(keccak256(abi.encodePacked(seed + 10 * i + 1))) % 1640)
        ),
        scale: uint8(
          30 + (uint256(keccak256(abi.encodePacked(seed + 10 * i + 2))) % 70)
        )
      });
    }
    return result;
  }

  function scalePlanets(IWands.Planet[8] memory planets)
    internal
    pure
    returns (Template.Planet[8] memory result)
  {
    for (uint256 i = 0; i < 8; i++) {
      result[i].visible = planets[i].visible;
      result[i].x = int16((int256(planets[i].x) * 520) / 127);
      result[i].y = int16((int256(planets[i].y) * 520) / 127);
    }
  }

  function scaleAspects(IWands.Aspect[8] memory aspects)
    internal
    pure
    returns (Template.Aspect[8] memory result)
  {
    for (uint256 i = 0; i < 8; i++) {
      result[i].x1 = int16((int256(aspects[i].x1) * 260) / 127);
      result[i].y1 = int16((int256(aspects[i].y1) * 260) / 127);
      result[i].x1 = int16((int256(aspects[i].x1) * 260) / 127);
      result[i].y1 = int16((int256(aspects[i].y1) * 260) / 127);
    }
  }
}
